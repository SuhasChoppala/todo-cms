import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'isPremium',
      type: 'checkbox',
      defaultValue: false,
      label: 'Premium User',
    },
  ],
  access: {
    create: () => true,
  },
}
