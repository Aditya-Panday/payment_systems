// components/PaymentSection.tsx
"use client";

import {
  CreditCard,
  Globe,
  LandmarkIcon,
  Phone,
  ShoppingCart,
  TagIcon,
  Wallet,
  Zap,
} from "lucide-react";
import PaymentCard, { Gateway } from "../paymentCard/PaymentCards";

// ── Gateway Data ───────────────────────────────────────────
const gateways: Gateway[] = [
  {
    id: "paytm",
    name: "Paytm",
    description:
      "India ka #1 payment gateway — UPI, wallet, aur card sab ek jagah.",
    tags: ["UPI", "Wallet", "₹ INR"],
    icon: <Wallet />,
    accentColor: "bg-gradient-to-r from-[#002970] to-[#00baf2]",
    iconBg: "bg-[#00baf2]/10",
    iconColor: "text-[#00baf2]",
    buttonHover:
      "hover:bg-[#00baf2]/15 hover:border-[#00baf2]/40 hover:text-[#00baf2]",
  },
  {
    id: "stripe",
    name: "Stripe",
    description:
      "Global payments ke liye best choice — 135+ currencies supported.",
    tags: ["Global", "Cards", "Webhooks"],
    icon: <CreditCard />,
    accentColor: "bg-gradient-to-r from-[#635bff] to-[#a78bfa]",
    iconBg: "bg-[#635bff]/15",
    iconColor: "text-[#7c75ff]",
    buttonHover:
      "hover:bg-[#635bff]/15 hover:border-[#635bff]/40 hover:text-[#7c75ff]",
  },
  {
    id: "paypal",
    name: "PayPal",
    description:
      "Globally trusted — buyer protection aur instant transfers available.",
    tags: ["Trusted", "200+ Countries"],
    icon: <Globe />,
    accentColor: "bg-gradient-to-r from-[#003087] to-[#009cde]",
    iconBg: "bg-[#009cde]/10",
    iconColor: "text-[#009cde]",
    buttonHover:
      "hover:bg-[#009cde]/15 hover:border-[#009cde]/40 hover:text-[#009cde]",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description:
      "Developer-first Indian gateway — smart routing aur real-time analytics.",
    tags: ["Smart Routing", "₹ INR", "APIs"],
    icon: <LandmarkIcon />,
    accentColor: "bg-gradient-to-r from-[#072654] to-[#3395ff]",
    iconBg: "bg-[#3395ff]/10",
    iconColor: "text-[#3395ff]",
    buttonHover:
      "hover:bg-[#3395ff]/15 hover:border-[#3395ff]/40 hover:text-[#3395ff]",
  },
];

// ── Stats ──────────────────────────────────────────────────
const stats = [
  { value: "4", label: "Payment gateways" },
  { value: "99.9%", label: "Uptime guarantee" },
  { value: "2 min", label: "Setup time" },
];

// ── Main Component ─────────────────────────────────────────
export default function PaymentSection() {
  return (
    <section className="bg-[#0a0e1a] min-h-screen text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 border-b border-white/[0.08]">
        <div className="flex items-center gap-2 text-[17px] font-medium">
          <span className="w-2 h-2 rounded-full bg-[#5b9cff] inline-block" />
          PaySwitch
        </div>
        <ul className="hidden md:flex gap-8 list-none">
          {["Gateways", "Pricing", "Docs"].map((item) => (
            <li key={item}>
              <a
                href="#"
                className="text-[13px] text-white/50 hover:text-white/80 transition-colors no-underline"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button className="bg-[#5b9cff] text-white text-[13px] px-5 py-2 rounded-lg hover:bg-[#4a8ff0] transition-colors cursor-pointer border-none">
          Get started
        </button>
      </nav>

      {/* Hero */}
      <div className="text-center px-6 pt-16 pb-10">
        <span className="inline-block text-[11px] tracking-widest uppercase px-4 py-1 rounded-full bg-[#5b9cff]/10 text-[#5b9cff] border border-[#5b9cff]/25 mb-5">
          8 Gateways · One Dashboard
        </span>
        <h1 className="text-4xl md:text-[42px] font-medium leading-tight tracking-tight mb-4">
          Ever Easy{" "}
          <span className="bg-gradient-to-r from-[#5b9cff] to-[#a78bfa] bg-clip-text text-transparent">
            Payment Integrations
          </span>
        </h1>
        <p className="text-[15px] text-white/45 max-w-md mx-auto leading-relaxed">
          Manage Paytm, Stripe, PayPal, Razorpay, and PhonePe from one place —
          hassle-free.
        </p>
      </div>

      {/* Gateway Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-10 pb-16 max-w-6xl mx-auto">
        {gateways.map((gw) => (
          <PaymentCard key={gw.id} gateway={gw} />
        ))}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-3 border-t border-b border-white/[0.07]">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`text-center py-6 ${i < stats.length - 1 ? "border-r border-white/[0.07]" : ""}`}
          >
            <p className="text-[28px] font-medium tracking-tight">
              {stat.value}
            </p>
            <p className="text-[12px] text-white/35 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
