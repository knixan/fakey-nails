import Link from 'next/link';
import { Instagram, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-14 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-2xl font-bold mb-3">
              Fakey <span className="text-primary">Nails</span>
            </h3>
            <p className="font-body text-sm text-background/70 max-w-xs mx-auto md:mx-0">
              Professionell nagelstudio i hjärtat av Stockholm. Boka din behandling idag och upplev
              skillnaden.
            </p>
          </div>

          {/* Kontakt */}
          <div className="space-y-3">
            <h4 className="font-heading text-lg font-semibold">Kontakt</h4>

            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-background/80">
              <MapPin size={16} />
              <span>Storgatan 12, Stockholm</span>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-background/80">
              <Phone size={16} />
              <span>08-123 456 78</span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-3">
            <h4 className="font-heading text-lg font-semibold">Följ oss</h4>

            <div className="flex items-center justify-center md:justify-start gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                className="bg-primary/10 p-2 rounded-full hover:bg-primary/20 transition"
              >
                <Instagram size={18} className="text-primary" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 mt-10 pt-6 text-center">
          <p className="font-body text-xs text-background/60">
            © {new Date().getFullYear()} Fakey Nails. Alla rättigheter förbehållna.
          </p>
          <a
            href="https://kodochdesign.se"
            target="_blank"
            className="text-primary hover:underline"
          >
            Kod och Design{' '}
          </a>{' '}
          <p className="font-body text-xs text-background/60">av Josefine Eriksson</p>
        </div>
      </div>
    </footer>
  );
}
