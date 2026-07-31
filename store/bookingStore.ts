import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BookingItem } from "@/app/lib/types";

interface BookingStore {
  bookings: BookingItem[];
  addBooking: (item: BookingItem) => void;
  removeBooking: (classId: string) => void;
  clearBookings: () => void;
  isBooked: (classId: string) => boolean;
  totalBookings: () => number;
}

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: [],
      addBooking: (item) => {
        const exists = get().bookings.some((b) => b.classId === item.classId);
        if (!exists) {
          set((state) => ({ bookings: [...state.bookings, item] }));
        }
      },
      removeBooking: (classId) => {
        set((state) => ({
          bookings: state.bookings.filter((b) => b.classId !== classId),
        }));
      },
      clearBookings: () => set({ bookings: [] }),
      isBooked: (classId) => {
        return get().bookings.some((b) => b.classId === classId);
      },
      totalBookings: () => get().bookings.length,
    }),
    { name: "ironpulse-bookings" }
  )
);