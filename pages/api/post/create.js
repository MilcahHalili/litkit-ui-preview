import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  console.log(req.body.content, req.body.promptId, req.method)
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const post = await prisma.post.create({
        data: {
          authorId: req.body.authorId,
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