import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  console.log(req.method)
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const prompt = await prisma.prompt.create({
        data: {
          instructorId: 1,
          workshopId: 1,
          title: req.body.title,
          content: req.body.content
        }
      })
      res.status(200).json(prompt)
    }

    main()
      .catch(e => {
        throw e
      })
      .finally(async () => {
        await prisma.$disconnect()
      })
  }
}
