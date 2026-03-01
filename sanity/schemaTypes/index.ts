import { type SchemaTypeDefinition } from 'sanity'
import { heroSettings } from './heroSettings'
import { service } from './service'
import { priceCategory } from './priceCategory'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [heroSettings, service, priceCategory],
}
