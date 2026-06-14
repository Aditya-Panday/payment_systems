import { NextResponse } from "next/server";
import PaytmChecksum from "paytmchecksum";
import https from "https";
import { generateOrderId } from "@/lib/paytm";

export async function POST() {
  try {
    const orderId = generateOrderId();
    console.log("process.env.PAYTM_MID", process.env.PAYTM_MERCHANT_ID);
    console.log("process.env.PAYTM_WEBSITE", process.env.PAYTM_WEBSITE);
    console.log(
      "process.env.PAYTM_MERCHANT_KEY",
      process.env.PAYTM_MERCHANT_KEY,
    );
    console.log(
      "PAYTM_MERCHANT_KEY length",
      process.env.PAYTM_MERCHANT_KEY?.length,
    );
    console.log("process.env.PAYTM_HOST", process.env.PAYTM_HOST);

    const paytmParamsBody = {
      requestType: "Payment",
      mid: process.env.PAYTM_MERCHANT_ID!,
      websiteName: process.env.PAYTM_WEBSITE!,
      orderId,
      callbackUrl:
        `${process.env.PAYTM_HOST}/theia/paytmCallback?ORDER_ID=` + orderId,
      txnAmount: {
        value: "1.00",
        currency: "INR",
      },
      userInfo: {
        custId: "CUST_001",
      },
    };

    // Must pass as string — paytmchecksum's getStringByParams calls .toLowerCase()
    // on values which breaks for nested objects like txnAmount/userInfo
    const bodyString = JSON.stringify(paytmParamsBody);
    const checksum = await PaytmChecksum.generateSignature(
      bodyString,
      process.env.PAYTM_MERCHANT_KEY!,
    );

    const paytmParams = {
      body: paytmParamsBody,
      head: {
        signature: checksum,
      },
    };

    console.log("paytmParams", JSON.stringify(paytmParams, null, 2));

    const postData = JSON.stringify(paytmParams);

    // Extract hostname from PAYTM_HOST env var
    const paytmHostname = new URL(process.env.PAYTM_HOST!).hostname;

    type PaytmInitResponse = {
      body?: {
        txnToken?: string;
        resultInfo?: {
          resultMsg?: string;
          resultCode?: string;
        };
        [key: string]: unknown;
      };
      [key: string]: unknown;
    };

    const response = await new Promise<PaytmInitResponse>((resolve, reject) => {
      const options = {
        hostname: paytmHostname,
        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MERCHANT_ID}&orderId=${orderId}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": postData.length,
        },
      };

      let result = "";

      const req = https.request(options, (res) => {
        res.on("data", (chunk) => {
          result += chunk;
        });

        res.on("end", () => {
          resolve(JSON.parse(result) as PaytmInitResponse);
        });
      });

      req.on("error", reject);

      req.write(postData);
      req.end();
    });
    console.log("response-----------", JSON.stringify(response, null, 2));

    if (!response.body?.txnToken) {
      return NextResponse.json(
        {
          success: false,
          message:
            response.body?.resultInfo?.resultMsg ||
            "Failed to get transaction token",
          resultCode: response.body?.resultInfo?.resultCode,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      txnToken: response.body.txnToken,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to generate transaction token",
      },
      { status: 500 },
    );
  }
}
