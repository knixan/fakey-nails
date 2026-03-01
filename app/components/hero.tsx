import Image from "next/image"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"

// background image from public folder (public/hero.webp) used as fallback
const heroImageSrc = "/hero.webp"

type HeroData = {
  heading?: string
  subheading?: string
  description?: string
  ctaLabel?: string
  backgroundImage?: { asset: { _ref: string } }
}

async function getHero(): Promise<HeroData | null> {
  return client.fetch(`*[_type == "heroSettings"][0]`, {}, { next: { revalidate: 60 } })
}

export default async function Hero() {
  const data = await getHero()

  const heading = data?.heading ?? "Fakey Nails"
  const subheading = data?.subheading ?? "Välkommen till"
  const description =
    data?.description ??
    "Professionella akrylnaglar, gelnaglar och gellack i en lyxig miljö. Din skönhet, vår passion."
  const ctaLabel = data?.ctaLabel ?? "Boka Din Tid"
  const bgSrc =
    data?.backgroundImage ? urlFor(data.backgroundImage).width(1920).height(1080).url() : heroImageSrc
  return (
    <section
      id="hem"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={bgSrc}
          alt="Fakey Nails salong"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <p className="font-body text-sm uppercase tracking-[0.3em] text-secondary mb-4 opacity-90">
          {subheading}
        </p>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-secondary mb-6 leading-tight">
          {heading.split(" ")[0]}{" "}
          <span className="text-primary italic">{heading.split(" ").slice(1).join(" ")}</span>
        </h1>

        <p className="font-body text-lg md:text-xl text-secondary/80 mb-10 max-w-xl mx-auto">
          {description}
        </p>

        <Link
          href="#kontakt"
          className="inline-block bg-primary text-primary-foreground font-body font-semibold text-sm uppercase tracking-wider px-10 py-4 rounded-full hover:opacity-90 transition-opacity duration-200"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  )
}