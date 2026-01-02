import { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  slug: 'todos',
  access: {
    read: ({ req }) => {
      if (!req.user) return false

      return {
        user: {
          equals: req.user.id,
        },
      }
    },
    create: ({ req }) => (req.user ? true : false),

    update: ({ req }) => {
      if (!req.user) return false

      return {
        user: {
          equals: req.user.id,
        },
      }
    },
    delete: ({ req }) => {
      if (!req.user) return false

      return {
        user: {
          equals: req.user.id,
        },
      }
    },
  },
  fields: [
    {
      name: 'task',
      type: 'text',
      required: true,
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      defaultValue: ({ user }) => {
        if (!user) return undefined
        return user.id
      },
    },
  ],
}
