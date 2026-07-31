"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { InstagramIcon, TwitterIcon, LinkedinIcon } from "@/app/components/icons";
import { Trainer } from "@/app/lib/types";

const socialIcons = {
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  linkedin: LinkedinIcon,
};

export default function TrainerCard({
  trainer,
  index = 0,
}: {
  trainer: Trainer;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      className="card text-center group overflow-visible"  // ✅ removed overflow-hidden, added overflow-visible
    >
      <div className="relative w-32 h-32 mx-auto -mt-12 rounded-full overflow-hidden border-4 border-surface shadow-xl">
        <Image
          src={trainer.image}
          alt={trainer.name}
          fill
          className="object-cover"
          sizes="128px"
        />
      </div>

      <h3 className="font-display text-xl font-bold mt-4 group-hover:text-accent transition-colors">
        {trainer.name}
      </h3>
      <p className="text-accent text-sm font-medium">{trainer.specialty}</p>

      <div className="flex items-center justify-center gap-1 mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(trainer.rating)
                ? "fill-accent text-accent"
                : "text-text-secondary"
            }`}
          />
        ))}
        <span className="text-text-secondary text-sm ml-1">
          {trainer.rating}
        </span>
      </div>

      <p className="text-text-secondary text-sm mt-3 line-clamp-3">
        {trainer.bio}
      </p>

      <div className="flex flex-wrap gap-1.5 justify-center mt-3">
        {trainer.certifications.slice(0, 3).map((cert) => (
          <span
            key={cert}
            className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-medium rounded-full"
          >
            {cert}
          </span>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-4 pt-4 border-t border-border">
        {Object.entries(trainer.socials).map(([key, href]) => {
          const Icon = socialIcons[key as keyof typeof socialIcons];
          if (!Icon || !href) return null;
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background rounded-lg hover:bg-accent/20 transition-colors"
              aria-label={`${trainer.name} on ${key}`}
            >
              <Icon className="w-4 h-4 text-text-secondary hover:text-accent transition-colors" />
            </a>
          );
        })}
      </div>
    </motion.div>
  );
}