import React from "react";

export type Gateway = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  icon: React.ReactNode;
  accentColor: string;
  iconBg: string;
  iconColor: string;
  buttonHover: string;
};

type PaymentCardProps = {
  gateway: Gateway;
  onPayNow: (id: string) => void;
};

export default function PaymentCard({ gateway, onPayNow }: PaymentCardProps) {
  return (
    <div
      className={`
        group relative flex flex-col rounded-2xl overflow-hidden
        bg-white/[0.04] border border-white/10
        hover:bg-white/[0.07] hover:border-white/20
        transition-all duration-200 p-6
      `}
    >
      {/* Bottom accent line — slides in on hover */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 h-[2px]
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
          ${gateway.accentColor}
        `}
      />

      {/* Icon */}
      <div
        className={`
          w-11 h-11 rounded-xl flex items-center justify-center mb-4
          ${gateway.iconBg}
        `}
      >
        <span className={`text-xl ${gateway.iconColor}`}>{gateway.icon}</span>
      </div>

      {/* Name */}
      <p className="text-[15px] font-medium text-white/90 mb-1">
        {gateway.name}
      </p>

      {/* Description */}
      <p className="text-[12px] text-white/35 leading-relaxed mb-4 flex-1">
        {gateway.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {gateway.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/40 border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Pay Now Button */}
      <button
        onClick={() => onPayNow(gateway.id)}
        className={`
          w-full py-2.5 rounded-xl text-[13px] font-medium
          border border-white/[0.18] bg-white/[0.07] text-white/85
          flex items-center justify-center gap-2
          transition-all duration-200 cursor-pointer
          ${gateway.buttonHover}
        `}
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
        Pay Now
      </button>
    </div>
  );
}
