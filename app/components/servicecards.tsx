import Image from 'next/image';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

// use public folder URLs rather than importing assets; Next.js will serve them statically
const acrylicImgSrc = '/acrylic.webp';
const gelNailsImgSrc = '/gelnails.webp';
const gellackImgSrc = '/gellack.webp';

type SanityService = {
  _id: string;
  title: string;
  description?: string;
  image?: { asset: { _ref: string } };
};

type Service = {
  title: string;
  description: string;
  image: string;
};

const defaultServices: Service[] = [
  {
    title: 'Akrylnaglar',
    description:
      'Hållbara och vackra akrylnaglar i valfri form och längd. Perfekta för dig som vill ha starka, eleganta naglar.',
    image: acrylicImgSrc,
  },
  {
    title: 'Gelnaglar',
    description:
      'Naturligt utseende med gelförstärkning som ger dina naglar extra styrka och en fantastisk glans.',
    image: gelNailsImgSrc,
  },
  {
    title: 'Gellack & Manikyr',
    description:
      'Långvarig gellack med fantastisk hållbarhet. Kombinera med en avkopplande manikyrbehandling.',
    image: gellackImgSrc,
  },
];

async function getServices(): Promise<SanityService[]> {
  return client.fetch(`*[_type == "service"] | order(order asc)`, {}, { next: { revalidate: 60 } });
}

export default async function ServiceCards() {
  const raw = await getServices();

  // Use Sanity data if available, otherwise fall back to hardcoded defaults
  const services: Service[] =
    raw.length > 0
      ? raw.map((s, i) => ({
          title: s.title,
          description: s.description ?? '',
          image: s.image
            ? urlFor(s.image).width(800).height(800).url()
            : (defaultServices[i]?.image ?? acrylicImgSrc),
        }))
      : defaultServices;

  return (
    <section id="tjanster" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Våra Tjänster
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Skönhet i varje detalj
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map(function (service) {
            return (
              <div
                key={service.title}
                className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-6">
                  <h3 className="font-heading text-2xl font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>

                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
