"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, Calendar, Clock, User, X } from "lucide-react";
import { useBookingStore } from "@/store/bookingStore";
import { BookingItem } from "@/app/lib/types";

export default function BookingPage() {
  // Explicitly type the store to avoid 'unknown' inference
  const bookings = useBookingStore((state:any) => state.bookings);
  const removeBooking = useBookingStore((state:any) => state.removeBooking);
  const clearBookings = useBookingStore((state:any) => state.clearBookings);
  const totalBookings = useBookingStore((state:any) => state.totalBookings);

  if (bookings.length === 0) {
    return (
      <div className="pt-24 pb-20 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-text-secondary mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-white mb-2">
            No Bookings Yet
          </h2>
          <p className="text-text-secondary mb-6">
            Start exploring classes and book your first session.
          </p>
          <Link href="/classes" className="btn-primary">
            Browse Classes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">
              Your <span className="text-accent">Bookings</span>
            </h1>
            <p className="text-text-secondary text-sm">
              {totalBookings()} class{totalBookings() !== 1 ? "es" : ""} booked
            </p>
          </div>
          <button
            onClick={clearBookings}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="space-y-4">
          {bookings.map((booking: BookingItem, idx: number) => (
            <motion.div
              key={booking.classId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              className="card p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="font-display text-lg font-bold">
                  {booking.className}
                </h3>
                <div className="flex flex-wrap gap-3 text-sm text-text-secondary mt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" /> {booking.trainer}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {booking.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {booking.day}
                  </span>
                </div>
              </div>

              <button
                onClick={() => removeBooking(booking.classId)}
                className="text-red-400 hover:text-red-300 transition-colors p-2 hover:bg-red-400/10 rounded-lg self-start sm:self-center"
                aria-label="Remove booking"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-border pt-8">
          <Link href="/classes" className="btn-outline text-sm">
            ← Browse More Classes
          </Link>
          <Link href="/membership" className="btn-primary text-sm">
            Upgrade Membership →
          </Link>
        </div>
      </div>
    </div>
  );
}