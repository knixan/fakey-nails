import { defineField, defineType } from 'sanity'

export const heroSettings = defineType({
  name: 'heroSettings',
  title: 'Hero-sektion',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Rubrik',
      type: 'string',
      description: 'T.ex. "Fakey Nails"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Underrubrik',
      type: 'string',
      description: 'Liten text ovanför rubriken, t.ex. "Välkommen till"',
    }),
    defineField({
      name: 'description',
      title: 'Brödtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Knapptext',
      type: 'string',
      description: 'Text på boka-knappen',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Bakgrundsbild',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'heading', media: 'backgroundImage' },
  },
})
