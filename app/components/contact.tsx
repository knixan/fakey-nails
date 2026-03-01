"use client";

import { MapPin, Phone, Clock, Instagram } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

type ContactFormValues = {
  name: string;
  phone: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
    mode: "onTouched",
  });

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Något gick fel.");
      }
      reset();
    } catch (err: unknown) {
      setServerError(
        err instanceof Error ? err.message : "Kunde inte skicka meddelandet."
      );
    }
  };

  const inputBase =
    "w-full bg-card border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <section id="kontakt" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Kontakta oss
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">
                  Adress
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  Storgatan 12, 111 22 Stockholm
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">
                  Telefon
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  08-123 456 78
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">
                  Öppettider
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  Mån–Fre: 10:00–19:00
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Lör: 10:00–16:00
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  Sön: Stängt
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Instagram size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="font-heading text-lg font-semibold text-foreground">
                  Instagram
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  @fakeynails
                </p>
              </div>
            </div>
          </div>

          {/* Contact form (RHF) */}
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">
                Namn
              </label>
              <input
                type="text"
                className={`${inputBase} ${errors.name ? "border-destructive" : ""}`}
                placeholder="Ditt namn"
                aria-invalid={!!errors.name}
                {...register("name", {
                  required: "Skriv ditt namn.",
                  minLength: { value: 2, message: "Minst 2 tecken." },
                })}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                className={`${inputBase} ${errors.phone ? "border-destructive" : ""}`}
                placeholder="07X-XXX XX XX"
                aria-invalid={!!errors.phone}
                {...register("phone", {
                  required: "Skriv ditt telefonnummer.",
                  // Enkel svensk-mobil regex: 07 + 8 siffror (tillåter mellanslag och bindestreck)
                  pattern: {
                    value: /^07\d(?:[\s-]?\d){7}$/,
                    message: "Skriv ett giltigt mobilnummer (t.ex. 070-123 45 67).",
                  },
                })}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">
                Meddelande
              </label>
              <textarea
                rows={4}
                className={`${inputBase} resize-none ${errors.message ? "border-destructive" : ""}`}
                placeholder="Vilken behandling önskar du?"
                aria-invalid={!!errors.message}
                {...register("message", {
                  required: "Skriv ett meddelande.",
                  minLength: { value: 10, message: "Skriv minst 10 tecken." },
                  maxLength: { value: 1000, message: "Max 1000 tecken." },
                })}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider py-3.5 rounded-full hover:opacity-90 transition-opacity duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Skickar..." : "Skicka Meddelande"}
            </button>

            {isSubmitSuccessful && !serverError && (
              <p className="text-sm text-green-600 text-center">
                Tack! Ditt meddelande är skickat.
              </p>
            )}
            {serverError && (
              <p className="text-sm text-destructive text-center">{serverError}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}