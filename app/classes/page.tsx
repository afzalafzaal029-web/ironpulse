"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { classes } from "@/app/lib/data";
import ClassCard from "@/app/components/ClassCard";

const levels = ["All", "Beginner", "Intermediate", "Advanced"];
const categories = [
  "All",
  "HIIT",
  "Yoga",
  "CrossFit",
  "Boxing",
  "Strength",
  "Cycling",
  "Pilates",
  "Martial Arts",
];

function ClassesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedLevel, setSelectedLevel] = useState(
    searchParams.get("level") || "All"
  );
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredClasses = useMemo(() => {
    return classes.filter((cls) => {
      const levelMatch =
        selectedLevel === "All" || cls.level === selectedLevel;
      const categoryMatch =
        selectedCategory === "All" || cls.category === selectedCategory;
      const searchMatch =
        searchQuery === "" ||
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.trainer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.category.toLowerCase().includes(searchQuery.toLowerCase());
      return levelMatch && categoryMatch && searchMatch;
    });
  }, [selectedLevel, selectedCategory, searchQuery]);

  const updateLevel = (level: string) => {
    setSelectedLevel(level);
    const params = new URLSearchParams(searchParams);
    if (level === "All") {
      params.delete("level");
    } else {
      params.set("level", level.toLowerCase());
    }
    router.push(`/classes?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-semibold">
            Find Your Class
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mt-2 mb-4">
            All <span className="text-accent">Classes</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Filter by level, category, or search to find your perfect
            workout.
          </p>
        </motion.div>

        {/* search & filter */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                placeholder="Search classes, trainers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-white placeholder-text-secondary focus:outline-none focus:border-accent transition-colors"
                aria-label="Search classes"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-text-secondary" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-lg text-white hover:border-accent transition-colors w-full sm:w-auto justify-center"
              aria-expanded={showFilters}
            >
              <Filter className="w-5 h-5" />
              Filters
              {(selectedLevel !== "All" || selectedCategory !== "All") && (
                <span className="bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>

          {/* filter options */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-surface border border-border rounded-xl p-6 space-y-6"
            >
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-text-secondary">
                  Level
                </h3>
                <div className="flex flex-wrap gap-2">
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => updateLevel(level)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedLevel === level
                          ? "bg-accent text-white"
                          : "bg-background text-text-secondary hover:text-white hover:bg-border"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-text-secondary">
                  Category
                </h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-accent text-white"
                          : "bg-background text-text-secondary hover:text-white hover:bg-border"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedLevel("All");
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="text-accent text-sm font-medium hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>

        <p className="text-text-secondary mb-6">
          Showing <span className="text-white font-semibold">{filteredClasses.length}</span>{" "}
          classes
        </p>

        {filteredClasses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredClasses.map((cls, idx) => (
              <ClassCard key={cls.id} classItem={cls} index={idx} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No classes match your filters.</p>
            <button
              onClick={() => {
                setSelectedLevel("All");
                setSelectedCategory("All");
                setSearchQuery("");
              }}
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

export default function ClassesPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-text-secondary">Loading classes...</div>}>
      <ClassesContent />
    </Suspense>
  );
}
