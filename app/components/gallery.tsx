import Image from 'next/image';

const categories = [
  {
    title: 'Akrylnaglar',
    description: 'Hållbara naglar i valfri form och längd',
    image: '/gallery/akryl.png',
    tag: 'Populärt',
  },
  {
    title: 'Gelnaglar',
    description: 'Naturligt utseende med extra styrka och glans',
    image: '/gallery/gel.png',
    tag: null,
  },
  {
    title: 'Manikyr',
    description: 'Avkopplande behandling för välvårdade naglar',
    image: '/gallery/manikyr.png',
    tag: null,
  },
  {
    title: 'Gellackade naglar',
    description: 'Långvarig färg med fantastisk hållbarhet',
    image: '/gallery/gellack.png',
    tag: null,
  },
];

export default function Gallery() {
  return (
    <section id="galleri" className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-primary mb-3">Galleri</p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Bilder på kunders naglar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map(item => (
            <div
              key={item.title}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 aspect-[4/3]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Tag */}
              {item.tag && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground font-body text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  {item.tag}
                </span>
              )}

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl font-semibold text-white mb-1">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-white/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
