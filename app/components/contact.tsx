"use client"

import { MapPin, Phone, Clock, Instagram } from "lucide-react"
import type { FormEvent } from "react"

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

export default function Contact() {
  return (
    <section id="kontakt" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Kontakta Oss
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Boka din tid idag
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

          {/* Contact form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">
                Namn
              </label>
              <input
                type="text"
                className="w-full bg-card border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Ditt namn"
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">
                Telefon
              </label>
              <input
                type="tel"
                className="w-full bg-card border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="07X-XXX XX XX"
              />
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-1.5">
                Meddelande
              </label>
              <textarea
                rows={4}
                className="w-full bg-card border border-border rounded-lg px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Vilken behandling önskar du?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider py-3.5 rounded-full hover:opacity-90 transition-opacity duration-200"
            >
              Skicka Meddelande
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}