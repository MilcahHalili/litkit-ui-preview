import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  console.log('are we having fun yet')
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const user = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      });
      console.log(user)
      const prompt = await prisma.prompt.create({
        data: {
          authorId: user.id,
          workshopId: parseInt(req.body.workshopId),
          title: req.body.title,
          content: req.body.content
        }
      });
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
