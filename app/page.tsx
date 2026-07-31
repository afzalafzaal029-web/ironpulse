"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, ChevronRight } from "lucide-react";
import { classes, trainers, testimonials } from "@/app/lib/data";
import StatsCounter from "@/app/components/StatsCounter";
import BMICalculator from "@/app/components/BMICalculator";
import ClassCard from "@/app/components/ClassCard";
import TrainerCard from "@/app/components/TrainerCard";
import TestimonialCard from "@/app/components/TestimonialCard";

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=85"
            alt="IRONPULSE Gym interior with professional equipment"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-20 text-center px-4 max-w-5xl mx-auto"
        >

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1]"
          >
            FORGE YOUR{" "}
            <span className="text-gradient">PHYSIQUE</span>
            <br className="hidden sm:block" />
            BREAK YOUR LIMITS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
          >
            Join the most intense fitness experience. World-class trainers,
            cutting-edge equipment, and a community that refuses to settle for
            average.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              href="/membership"
              className="btn-primary text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 flex items-center gap-2 animate-pulse-orange"
            >
              Start Your Journey <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/classes"
              className="btn-outline text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 flex items-center gap-2 border-white/30 text-white hover:border-accent hover:text-accent"
            >
              <Play className="w-5 h-5" /> Explore Classes
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-accent rounded-full animate-bounce" />
          </div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <StatsCounter />

      {/* ── CLASSES PREVIEW ── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">
              Our Programs
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4">
              Classes That <span className="text-accent">Challenge</span> You
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              From high-intensity training to mindful movement, find the
              perfect class to crush your goals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {classes.slice(0, 4).map((cls, idx) => (
              <ClassCard key={cls.id} classItem={cls} index={idx} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/classes"
              className="inline-flex items-center gap-2 text-accent hover:text-orange-400 font-semibold transition-colors"
            >
              View All Classes <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BMI ── */}
      <section className="py-16 sm:py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <BMICalculator />
        </div>
      </section>

      {/* ── TRAINERS ── */}
      <section className="py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">
              Expert Coaches
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4">
              Meet Your <span className="text-accent">Trainers</span>
            </h2>
            <p className="text-text-secondary max-w-xl mx-auto">
              Elite coaches dedicated to pushing you beyond your perceived
              limits.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {trainers.slice(0, 3).map((trainer, idx) => (
              <TrainerCard key={trainer.id} trainer={trainer} index={idx} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/trainers"
              className="inline-flex items-center gap-2 text-accent hover:text-orange-400 font-semibold transition-colors"
            >
              All Trainers <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 sm:py-20 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="text-accent uppercase tracking-widest text-sm font-semibold">
              Success Stories
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-2 mb-4">
              What Our <span className="text-accent">Members</span> Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=1920&q=80"
            alt="Join IRONPULSE community"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
              Ready to <span className="text-accent">Transform</span>?
            </h2>
            <p className="text-text-secondary text-base sm:text-lg mb-10 max-w-xl mx-auto">
              Your first class is on us. Experience the IRONPULSE difference
              with a free trial session.
            </p>
            <Link
              href="/membership"
              className="btn-primary text-base sm:text-lg px-10 sm:px-12 py-4 sm:py-5 inline-flex items-center gap-2 animate-pulse-orange"
            >
              Claim Your Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
