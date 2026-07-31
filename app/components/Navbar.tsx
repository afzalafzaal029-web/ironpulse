"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, Menu, X, Moon, Sun, ShoppingBag } from "lucide-react";
import { useThemeStore } from "@/store/themeStore";
import { useBookingStore } from "@/store/bookingStore";
import clsx from "clsx";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/classes", label: "Classes" },
  { href: "/trainers", label: "Trainers" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const totalBookings = useBookingStore((state) => state.totalBookings);

  // ✅ Premium toggle handler with View Transition
  const handleToggleTheme = () => {
    // Agar browser View Transition support nahi karta, toh normal toggle
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    // Super smooth animation ke saath toggle
    document.startViewTransition(() => {
      toggleTheme();
    });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const displayedCount = mounted ? totalBookings() : 0;

  return (
    <nav
      className={clsx(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link
            href="/"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            <Dumbbell className="w-7 h-7 sm:w-8 sm:h-8 text-accent group-hover:rotate-12 transition-transform" />
            <span className="font-display text-xl sm:text-2xl font-bold tracking-wider">
              IRON<span className="text-accent">PULSE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "text-sm font-medium uppercase tracking-wider transition-colors relative group",
                  pathname === link.href
                    ? "text-accent"
                    : "text-text-secondary hover:text-white"
                )}
              >
                {link.label}
                <span
                  className={clsx(
                    "absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <button
              onClick={handleToggleTheme} // ✅ Updated handler
              className="p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-accent" />
              ) : (
                <Moon className="w-5 h-5 text-accent" />
              )}
            </button>

            <Link
              href="/booking"
              className="relative p-2 rounded-lg hover:bg-surface transition-colors"
              aria-label={`Bookings (${displayedCount})`}
            >
              <ShoppingBag className="w-5 h-5 text-accent" />
              {displayedCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {displayedCount}
                </span>
              )}
            </Link>

            <Link href="/membership" className="btn-primary text-sm py-2 px-5">
              Join Now
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "block py-3 px-4 rounded-lg text-sm font-medium uppercase tracking-wider transition-colors",
                    pathname === link.href
                      ? "bg-accent/10 text-accent"
                      : "text-text-secondary hover:bg-surface hover:text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <button
                  onClick={handleToggleTheme} // ✅ Updated handler
                  className="p-2 rounded-lg hover:bg-surface"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                <Link
                  href="/booking"
                  className="p-2 rounded-lg hover:bg-surface relative"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag className="w-5 h-5" />
                  {displayedCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                      {displayedCount}
                    </span>
                  )}
                </Link>
                <Link
                  href="/membership"
                  className="btn-primary text-sm py-2 px-5 flex-1 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}