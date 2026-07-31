"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { MembershipPlan } from "@/app/lib/types";

export default function PricingCard({
  plan,
  index = 0,
}: {
  plan: MembershipPlan;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`card text-center flex flex-col ${
        plan.highlighted
          ? "border-accent shadow-[0_0_40px_rgba(249,115,22,0.15)] relative"
          : ""
      }`}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
      <div className="mt-3">
        <span className="font-display text-4xl font-bold">${plan.price}</span>
        <span className="text-text-secondary text-sm ml-1">/ {plan.period}</span>
      </div>

      <ul className="mt-6 space-y-3 text-left flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm text-text-secondary">
            <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`mt-8 w-full py-3 rounded-lg font-bold text-sm transition-all ${
          plan.highlighted
            ? "btn-primary"
            : "border border-accent text-accent hover:bg-accent hover:text-white"
        }`}
      >
        {plan.highlighted ? "Get Started" : "Choose Plan"}
      </Link>
    </motion.div>
  );
}
