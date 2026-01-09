import { CollectionConfig } from 'payload'
import { APIError } from 'payload'

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

  hooks: {
    beforeChange: [
      async ({ operation, req }) => {
        if (operation != 'create') {
          return
        }

        const user = req.user

        if (user?.isPremium) {
          return
        }

        const { totalDocs } = await req.payload.count({
          collection: 'todos',
          where: {
            user: {
              equals: user?.id,
            },
          },
        })

        if (totalDocs >= 3) {
          throw new APIError('Free users can only create up to 3 todos. Upgrade to Premium.', 403)
        }
      },
    ],
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
