"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { trainers } from "@/app/lib/data";
import TrainerCard from "@/app/components/TrainerCard";

const specialties = [
  "All",
  "HIIT & Strength",
  "Yoga & Pilates",
  "CrossFit & Functional Training",
  "Boxing & Muay Thai",
  "Cycling & Cardio",
  "Flexibility & Mobility",
];

export default function TrainersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");

  const filteredTrainers = useMemo(() => {
    return trainers.filter((t) => {
      const specialtyMatch =
        selectedSpecialty === "All" || t.specialty === selectedSpecialty;
      const searchMatch =
        searchQuery === "" ||
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bio.toLowerCase().includes(searchQuery.toLowerCase());
      return specialtyMatch && searchMatch;
    });
  }, [selectedSpecialty, searchQuery]);

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-semibold">
            Expert Coaches
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mt-2 mb-4">
            Meet Our <span className="text-accent">Trainers</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            World-class coaches dedicated to your success.
          </p>
        </motion.div>

        {/* search & filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-10">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search trainers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
              aria-label="Search trainers"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                aria-label="Clear"
              >
                <X className="w-4 h-4 text-text-secondary" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 w-full sm:w-auto">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSelectedSpecialty(s)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedSpecialty === s
                    ? "bg-accent text-white"
                    : "bg-surface text-text-secondary hover:text-white border border-border hover:border-accent"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="text-text-secondary mb-6">
          Showing <span className="text-white font-semibold">{filteredTrainers.length}</span>{" "}
          trainers
        </p>

        {filteredTrainers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredTrainers.map((trainer, idx) => (
              <TrainerCard key={trainer.id} trainer={trainer} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No trainers match your filters.</p>
            <button
              onClick={() => { setSelectedSpecialty("All"); setSearchQuery(""); }}
              className="text-accent mt-2 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
