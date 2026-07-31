export interface ClassItem {
  id: string;
  name: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  trainer: string;
  time: string;
  duration: string;
  day: string;
  capacity: number;
  booked: number;
  image: string;
  description: string;
  calories: string;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  image: string;
  socials: { instagram?: string; twitter?: string; linkedin?: string };
  bio: string;
  certifications: string[];
}

export interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted: boolean;
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface BookingItem {
  classId: string;
  className: string;
  trainer: string;
  time: string;
  day: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  slug: string;
}
