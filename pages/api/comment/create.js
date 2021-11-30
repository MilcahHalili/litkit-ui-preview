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
      const comment = await prisma.comment.create({
        data: {
          authorId: user.id,
          content: req.body.content,
          postId: parseInt(req.body.postId)
        }
      })
      res.status(200).json(comment)
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