import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  if (req.mothod === 'POST') {
    async function main() {
      const post = await prisma.post.create({
        data: {
          authorId: 2,
          title: req.body.title,
          content: req.body.content,
          promptId: req.body.promptId
        }
      })
      res.status(200).json(post)
    }

    main()
    .catch(e => {throw e})
    .finally(async () => [
      await prisma.$disconnect()
    ])
  }
}