"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { ContactFormData } from "@/app/lib/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("Form data:", data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-12"
        >
          <span className="text-accent uppercase tracking-widest text-sm font-semibold">
            Get In Touch
          </span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mt-2 mb-4">
            <span className="text-accent">Contact</span> Us
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Have questions? We'd love to hear from you. Reach out and we'll
            get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* contact info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="card p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Visit Us</h4>
                  <p className="text-text-secondary text-sm">
                    123 Fitness Avenue
                    <br />Los Angeles, CA 90001
                  </p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Call Us</h4>
                  <p className="text-text-secondary text-sm">+1-555-123-4567</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <Mail className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Email Us</h4>
                  <p className="text-text-secondary text-sm">info@ironpulse.fit</p>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <h4 className="font-semibold text-white">Hours</h4>
                  <p className="text-text-secondary text-sm">
                    Mon – Sun: 5:00 AM – 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 sm:p-8"
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                  <h3 className="text-2xl font-display font-bold">Message Sent!</h3>
                  <p className="text-text-secondary mt-2">
                    We'll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Full Name *
                    </label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Email *
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1">
                        Phone *
                      </label>
                      <input
                        {...register("phone")}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent transition-colors"
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Message *
                    </label>
                    <textarea
                      {...register("message")}
                      rows={5}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-white focus:outline-none focus:border-accent transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
