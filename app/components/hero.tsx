import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const heroImageSrc = '/fakynails-hero.png';

type HeroData = {
  heading?: string;
  subheading?: string;
  description?: string;
  ctaLabel?: string;
  backgroundImage?: { asset: { _ref: string } };
};

async function getHero(): Promise<HeroData | null> {
  return client.fetch(`*[_type == "heroSettings"][0]`, {}, { next: { revalidate: 60 } });
}

const features = [
  {
    label: 'Lyxig miljö',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
      </svg>
    ),
  },
  {
    label: 'Hög kvalitet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2v-4M9 21H5a2 2 0 01-2-2v-4m0 0h18" />
      </svg>
    ),
  },
  {
    label: 'Personlig service',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    label: 'Passion för skönhet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l1.5 1.5M12 2v2M19 3l-1.5 1.5M3 12H1M23 12h-2M5 21l1.5-1.5M12 22v-2M19 21l-1.5-1.5M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
];

export default async function Hero() {
  const data = await getHero();

  const heading = data?.heading ?? 'Fakey Nails';
  const subheading = data?.subheading ?? 'Välkommen till';
  const description =
    data?.description ??
    'Professionella akrylnaglar, gelnaglar och gellack\ni en lyxig miljö. Din skönhet, vår passion.';
  const ctaLabel = data?.ctaLabel ?? 'Boka Din Tid';
  const bgSrc = data?.backgroundImage
    ? urlFor(data.backgroundImage).width(1920).height(1080).url()
    : heroImageSrc;

  return (
    <section
      id="hem"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image src={bgSrc} alt="Fakey Nails salong" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/30 to-transparent" />
      </div>

      {/* Content — left aligned */}
      <div className="relative z-10 w-full px-8 md:px-16 lg:px-24 xl:px-32 pb-16 pt-24">
        <div className="max-w-xl">
          {/* Subheading */}
          <p className="font-body text-xs uppercase tracking-[0.35em] text-[#d4a853] mb-3">
            {subheading}
          </p>

          {/* Decorative divider */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-[#d4a853]/60" />
            <span className="text-[#d4a853] text-sm">♥</span>
            <span className="h-px w-8 bg-[#d4a853]/60" />
          </div>

          {/* Main heading */}
          <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6">
            <span className="text-white">{heading.split(' ')[0]}</span>{' '}
            <span className="text-[#f472a8] italic">{heading.split(' ').slice(1).join(' ')}</span>
          </h1>

          {/* Description */}
          <p className="font-body text-base md:text-lg text-white/80 mb-10 whitespace-pre-line">
            {description}
          </p>

          {/* CTA button */}
          <Link
            href="#booking"
            className="inline-flex items-center gap-2 border-2 border-[#f472a8] text-white font-body font-semibold text-sm uppercase tracking-widest px-10 py-4 rounded-full hover:bg-[#f472a8]/20 transition-colors duration-200"
          >
            {ctaLabel} <span className="text-[#f472a8]">♥</span>
          </Link>

          {/* Feature icons */}
          <div className="flex flex-wrap gap-8 mt-16">
            {features.map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-2 text-[#d4a853]">
                {f.icon}
                <span className="font-body text-[10px] uppercase tracking-widest text-white/70">
                  {f.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
