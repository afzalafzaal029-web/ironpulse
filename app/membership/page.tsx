"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { membershipPlans } from "@/app/lib/data";
import PricingCard from "@/app/components/PricingCard";

export default function MembershipPage() {
  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-semibold">
            Pricing
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mt-2 mb-4">
            Choose Your <span className="text-accent">Membership</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Flexible plans designed to fit your fitness journey. Upgrade or
            cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {membershipPlans.map((plan, idx) => (
            <PricingCard key={plan.id} plan={plan} index={idx} />
          ))}
        </div>

        {/* feature comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 bg-surface border border-border rounded-2xl overflow-hidden"
        >
          <div className="p-6 sm:p-8 border-b border-border">
            <h3 className="font-display text-xl sm:text-2xl font-bold">
              Compare Plans
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-4 text-left text-text-secondary font-medium">Feature</th>
                  {membershipPlans.map((plan) => (
                    <th
                      key={plan.id}
                      className={`px-4 py-4 text-center font-display text-lg ${
                        plan.highlighted ? "text-accent" : "text-white"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  "Access to gym floor",
                  "Locker room access",
                  "Classes per week",
                  "Personal training sessions",
                  "Nutrition consultation",
                  "Recovery zone access",
                  "24/7 facility access",
                ].map((feature, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-background/50" : ""}
                  >
                    <td className="px-4 py-3 text-text-secondary">{feature}</td>
                    {membershipPlans.map((plan) => {
                      const has = plan.features.some((f) =>
                        f.toLowerCase().includes(feature.toLowerCase())
                      );
                      return (
                        <td key={plan.id} className="px-4 py-3 text-center">
                          {has ? (
                            <Check className="w-5 h-5 text-accent mx-auto" />
                          ) : (
                            <span className="text-text-secondary">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary mb-4">
            Not sure which plan is right for you? We're here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-accent hover:text-orange-400 font-semibold transition-colors"
          >
            Contact Us <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </div>
  );
}
