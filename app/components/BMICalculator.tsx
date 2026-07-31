"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Scale, Ruler, Calculator } from "lucide-react";

export default function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [bmi, setBmi] = useState<number | null>(null); // ✅ fixed type

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    if (!h || !w || h <= 0 || w <= 0) return;

    let result: number;
    if (unit === "metric") {
      result = w / ((h / 100) * (h / 100));
    } else {
      result = (w / (h * h)) * 703;
    }
    setBmi(Math.round(result * 10) / 10);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: "Underweight", color: "#60A5FA" };
    if (bmi < 25) return { label: "Healthy", color: "#34D399" };
    if (bmi < 30) return { label: "Overweight", color: "#FBBF24" };
    return { label: "Obese", color: "#EF4444" };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold">
          <span className="text-accent">BMI</span> Calculator
        </h2>
        <p className="text-text-secondary text-sm mt-2">
          Check your body mass index instantly
        </p>
      </div>

      <div className="card p-5 sm:p-8">
        <div className="flex gap-2 mb-6 justify-center">
          {(["metric", "imperial"] as const).map((u) => (
            <button
              key={u}
              onClick={() => {
                setUnit(u);
                setBmi(null);
                setHeight("");
                setWeight("");
              }}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                unit === u ? "bg-accent text-white" : "bg-background text-text-secondary"
              }`}
            >
              {u === "metric" ? "Metric (cm/kg)" : "Imperial (in/lbs)"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              <Ruler className="w-4 h-4 inline mr-1" />
              Height ({unit === "metric" ? "cm" : "inches"})
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder={unit === "metric" ? "175" : "69"}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
              aria-label="Height"
            />
          </div>
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              <Scale className="w-4 h-4 inline mr-1" />
              Weight ({unit === "metric" ? "kg" : "lbs"})
            </label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder={unit === "metric" ? "70" : "154"}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
              aria-label="Weight"
            />
          </div>
        </div>

        <button
          onClick={calculateBMI}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" /> Calculate BMI
        </button>

        {bmi !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center"
          >
            <div
              className="text-4xl font-display font-bold"
              style={{ color: getBMICategory(bmi).color }}
            >
              {bmi}
            </div>
            <div
              className="text-lg font-semibold mt-1"
              style={{ color: getBMICategory(bmi).color }}
            >
              {getBMICategory(bmi).label}
            </div>
            <div className="w-full h-2 bg-background rounded-full mt-4 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((bmi / 40) * 100, 100)}%`,
                  backgroundColor: getBMICategory(bmi).color,
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-text-secondary mt-1">
              <span>0</span>
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
              <span>40</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}