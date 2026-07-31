"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, User, Zap, Flame, Bookmark, BookmarkCheck } from "lucide-react";
import { ClassItem } from "@/app/lib/types";
import { useBookingStore } from "@/store/bookingStore";

const levelColors = {
  Beginner: "bg-green-500/20 text-green-400",
  Intermediate: "bg-yellow-500/20 text-yellow-400",
  Advanced: "bg-red-500/20 text-red-400",
};

export default function ClassCard({
  classItem,
  index = 0,
}: {
  classItem: ClassItem;
  index?: number;
}) {
  // ✅ Individual selectors – type safe
  const addBooking = useBookingStore((state:any) => state.addBooking);
  const removeBooking = useBookingStore((state:any) => state.removeBooking);
  const isBooked = useBookingStore((state:any) => state.isBooked);

  const booked = isBooked(classItem.id);

  const handleBooking = () => {
    if (booked) {
      removeBooking(classItem.id);
    } else {
      addBooking({
        classId: classItem.id,
        className: classItem.name,
        trainer: classItem.trainer,
        time: classItem.time,
        day: classItem.day,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="card overflow-hidden group flex flex-col"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
        <Image
          src={classItem.image}
          alt={classItem.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
        <span
          className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${levelColors[classItem.level]}`}
        >
          {classItem.level}
        </span>
        <button
          onClick={handleBooking}
          className="absolute top-3 right-3 p-2 bg-background/80 rounded-full hover:bg-accent transition-colors"
          aria-label={booked ? "Remove booking" : "Book this class"}
        >
          {booked ? (
            <BookmarkCheck className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
          ) : (
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          )}
        </button>
      </div>

      {/* Content */}
      <h3 className="font-display text-lg sm:text-xl font-bold mb-1 group-hover:text-accent transition-colors line-clamp-1">
        {classItem.name}
      </h3>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2 flex-1">
        {classItem.description}
      </p>

      <div className="space-y-1.5 text-sm">
        <div className="flex items-center gap-2 text-text-secondary">
          <User className="w-4 h-4 text-accent shrink-0" /> {classItem.trainer}
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <Clock className="w-4 h-4 text-accent shrink-0" /> {classItem.time} • {classItem.duration}
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <Flame className="w-4 h-4 text-accent shrink-0" /> {classItem.calories} cal
        </div>
        <div className="flex items-center gap-2 text-text-secondary">
          <Zap className="w-4 h-4 text-accent shrink-0" /> {classItem.day}
        </div>
      </div>

      {/* Capacity bar */}
      <div className="mt-4">
        <div className="flex justify-between text-xs text-text-secondary mb-1">
          <span>
            {classItem.booked}/{classItem.capacity} booked
          </span>
          <span>{classItem.capacity - classItem.booked} spots left</span>
        </div>
        <div className="h-2 bg-background rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: `${(classItem.booked / classItem.capacity) * 100}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleBooking}
        className={`mt-4 w-full py-2.5 rounded-lg font-semibold text-sm transition-all ${
          booked
            ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
            : "bg-accent text-white hover:bg-orange-600"
        }`}
      >
        {booked ? "Remove Booking" : "Book This Class"}
      </button>
    </motion.div>
  );
}