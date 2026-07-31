"use client";

import Link from "next/link";
import { Dumbbell, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, TwitterIcon, YoutubeIcon } from "@/app/components/icons";

const footerLinks = [
  { href: "/classes", label: "Classes" },
  { href: "/trainers", label: "Trainers" },
  { href: "/membership", label: "Membership" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
];

const socials = [
  { icon: InstagramIcon, href: "#", label: "Instagram" },
  { icon: TwitterIcon, href: "#", label: "Twitter" },
  { icon: YoutubeIcon, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <Dumbbell className="w-7 h-7 text-accent group-hover:rotate-12 transition-transform" />
              <span className="font-display text-xl font-bold tracking-wider">
                IRON<span className="text-accent">PULSE</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm mt-3 max-w-xs">
              Premium fitness studio dedicated to transforming lives through
              science-backed training and community.
            </p>
            <div className="flex gap-3 mt-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-background rounded-lg hover:bg-accent/20 transition-colors"
                >
                  <social.icon className="w-4 h-4 text-text-secondary hover:text-accent transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* quick links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary hover:text-accent transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2 text-text-secondary">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                123 Fitness Avenue, LA, CA
              </li>
              <li className="flex items-center gap-2 text-text-secondary">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                +1-555-123-4567
              </li>
              <li className="flex items-center gap-2 text-text-secondary">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                info@ironpulse.fit
              </li>
            </ul>
          </div>

          {/* hours */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-wider mb-4">
              Hours
            </h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><span className="text-white">Mon – Fri:</span> 5:00 AM – 10:00 PM</li>
              <li><span className="text-white">Sat:</span> 6:00 AM – 8:00 PM</li>
              <li><span className="text-white">Sun:</span> 7:00 AM – 8:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary text-xs">
            &copy; {new Date().getFullYear()} IRONPULSE. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-text-secondary">
            <Link href="/privacy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}