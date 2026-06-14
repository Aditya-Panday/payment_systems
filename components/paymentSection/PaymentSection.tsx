// components/PaymentSection.tsx
"use client";

import PaymentCard, { Gateway } from "../paymentCard/PaymentCards";

// ── SVG Icons ──────────────────────────────────────────────
const WalletIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M20 12V22H4a2 2 0 01-2-2V6a2 2 0 012-2h16v4" />
    <path d="M22 12a2 2 0 01-2 2h-3a2 2 0 110-4h3a2 2 0 012 2z" />
  </svg>
);

const CreditCardIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

const BankIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <line x1="3" y1="22" x2="21" y2="22" />
    <line x1="6" y1="18" x2="6" y2="11" />
    <line x1="10" y1="18" x2="10" y2="11" />
    <line x1="14" y1="18" x2="14" y2="11" />
    <line x1="18" y1="18" x2="18" y2="11" />
    <polygon points="12 2 20 7 4 7" />
  </svg>
);
const ShoppingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </svg>
);

const ZapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const TagIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const PhoneIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

// ── Gateway Data ───────────────────────────────────────────
const gateways: Gateway[] = [
  {
    id: "paytm",
    name: "Paytm",
    description:
      "India ka #1 payment gateway — UPI, wallet, aur card sab ek jagah.",
    tags: ["UPI", "Wallet", "₹ INR"],
    icon: <WalletIcon />,
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
    icon: <CreditCardIcon />,
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
    icon: <GlobeIcon />,
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
    icon: <BankIcon />,
    accentColor: "bg-gradient-to-r from-[#072654] to-[#3395ff]",
    iconBg: "bg-[#3395ff]/10",
    iconColor: "text-[#3395ff]",
    buttonHover:
      "hover:bg-[#3395ff]/15 hover:border-[#3395ff]/40 hover:text-[#3395ff]",
  },
  {
    id: "phonepe",
    name: "PhonePe",
    description:
      "India mein fastest growing — UPI ke saath BBPS bill payments bhi.",
    tags: ["UPI", "BBPS", "₹ INR"],
    icon: <PhoneIcon />,
    accentColor: "bg-gradient-to-r from-[#5f259f] to-[#9e5ff7]",
    iconBg: "bg-[#9e5ff7]/15",
    iconColor: "text-[#9e5ff7]",
    buttonHover:
      "hover:bg-[#9e5ff7]/15 hover:border-[#9e5ff7]/40 hover:text-[#9e5ff7]",
  },
  {
    id: "amazonpay",
    name: "Amazon Pay",
    description:
      "Amazon ka trusted checkout — 300M+ customers ke liye instant 1-click payment.",
    tags: ["1-Click", "Wallet", "EMI"],
    icon: <ShoppingIcon />,
    accentColor: "bg-gradient-to-r from-[#ff9900] to-[#ffb84d]",
    iconBg: "bg-[#ff9900]/10",
    iconColor: "text-[#ff9900]",
    buttonHover:
      "hover:bg-[#ff9900]/15 hover:border-[#ff9900]/40 hover:text-[#ff9900]",
  },
  {
    id: "cashfree",
    name: "Cashfree",
    description:
      "India ka fastest payout gateway — real-time settlements aur 120+ payment modes.",
    tags: ["Payouts", "120+ Modes", "₹ INR"],
    icon: <ZapIcon />,
    accentColor: "bg-gradient-to-r from-[#00c2a8] to-[#00e5c8]",
    iconBg: "bg-[#00c2a8]/10",
    iconColor: "text-[#00c2a8]",
    buttonHover:
      "hover:bg-[#00c2a8]/15 hover:border-[#00c2a8]/40 hover:text-[#00c2a8]",
  },
  {
    id: "klarna",
    name: "Klarna",
    description:
      "Buy Now Pay Later leader — flexible installments aur zero interest options.",
    tags: ["BNPL", "Installments", "EU/US"],
    icon: <TagIcon />,
    accentColor: "bg-gradient-to-r from-[#ffb3c7] to-[#ff6b9d]",
    iconBg: "bg-[#ff6b9d]/10",
    iconColor: "text-[#ff6b9d]",
    buttonHover:
      "hover:bg-[#ff6b9d]/15 hover:border-[#ff6b9d]/40 hover:text-[#ff6b9d]",
  },
];

// ── Stats ──────────────────────────────────────────────────
const stats = [
  { value: "5+", label: "Payment gateways" },
  { value: "99.9%", label: "Uptime guarantee" },
  { value: "2 min", label: "Setup time" },
];

// ── Main Component ─────────────────────────────────────────
export default function PaymentSection() {
  const handlePayNow = (id: string) => {
    alert(
      `${id.charAt(0).toUpperCase() + id.slice(1)} ke saath payment initiate ho rahi hai...`,
    );
  };

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
          5 Gateways · One Dashboard
        </span>
        <h1 className="text-4xl md:text-[42px] font-medium leading-tight tracking-tight mb-4">
          Sabse asan{" "}
          <span className="bg-gradient-to-r from-[#5b9cff] to-[#a78bfa] bg-clip-text text-transparent">
            payment integration
          </span>
        </h1>
        <p className="text-[15px] text-white/45 max-w-md mx-auto leading-relaxed">
          Ek jagah se Paytm, Stripe, PayPal, Razorpay aur PhonePe manage karo —
          bina jhanjhat ke.
        </p>
      </div>

      {/* Gateway Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 px-10 pb-16 max-w-6xl mx-auto">
        {gateways.map((gw) => (
          <PaymentCard key={gw.id} gateway={gw} onPayNow={handlePayNow} />
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
