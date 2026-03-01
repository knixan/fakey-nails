import { client } from "@/sanity/lib/client"

type PriceItem = {
  name: string
  price: string
}

type PriceCategory = {
  title: string
  items: PriceItem[]
}

const defaultCategories: PriceCategory[] = [
  {
    title: "Akrylnaglar",
    items: [
      { name: "Nytt set – kort/medel", price: "650 kr" },
      { name: "Nytt set – lång/XL", price: "750 kr" },
      { name: "Påfyllning", price: "550 kr" },
      { name: "Borttagning akryl", price: "250 kr" },
    ],
  },
  {
    title: "Gelnaglar",
    items: [
      { name: "Nytt set – kort/medel", price: "600 kr" },
      { name: "Nytt set – lång", price: "700 kr" },
      { name: "Påfyllning", price: "500 kr" },
      { name: "Borttagning gel", price: "200 kr" },
    ],
  },
  {
    title: "Gellack & Manikyr",
    items: [
      { name: "Gellack – händer", price: "350 kr" },
      { name: "Gellack – fötter", price: "400 kr" },
      { name: "Manikyr klassisk", price: "300 kr" },
      { name: "Manikyr + gellack", price: "500 kr" },
    ],
  },
]

async function getCategories(): Promise<PriceCategory[]> {
  return client.fetch(
    `*[_type == "priceCategory"] | order(order asc) { title, items }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export default async function PriceCards() {
  const raw = await getCategories()
  const priceCategories = raw.length > 0 ? raw : defaultCategories

  return (
    <section id="priser" className="py-24 px-4 bg-card">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <p className="font-body text-sm uppercase tracking-[0.2em] text-primary mb-3">
            Prislista
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground">
            Våra Priser
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {priceCategories.map(function (category) {
            return (
              <div
                key={category.title}
                className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <h3 className="font-heading text-2xl font-semibold text-foreground mb-6 text-center">
                  {category.title}
                </h3>

                <ul className="space-y-4">
                  {category.items.map(function (item) {
                    return (
                      <li
                        key={item.name}
                        className="flex justify-between items-center border-b border-border pb-3 last:border-0"
                      >
                        <span className="font-body text-sm text-muted-foreground">
                          {item.name}
                        </span>
                        <span className="font-body text-sm font-semibold text-foreground">
                          {item.price}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}