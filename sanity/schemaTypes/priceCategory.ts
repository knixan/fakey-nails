import { defineField, defineType } from 'sanity'

export const priceCategory = defineType({
  name: 'priceCategory',
  title: 'Priskategori',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Kategorititel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sorteringsordning',
      type: 'number',
      description: 'Lägre nummer visas först',
    }),
    defineField({
      name: 'items',
      title: 'Priser',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Behandling', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'price', title: 'Pris', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'price' },
          },
        },
      ],
    }),
  ],
  orderings: [{ title: 'Ordning', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title' },
  },
})
