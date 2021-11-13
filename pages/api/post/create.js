import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      })
      const post = await prisma.post.create({
        data: {
          authorId: user.id,
          content: req.body.content,
          promptId: parseInt(req.body.promptId),
          title: 'untitled'
        }
      })
      res.status(200).json(post)
    }

    main()
      .catch(e => {
        throw e
      })
      .finally(async () => [
        await prisma.$disconnect()
      ])
  }
}