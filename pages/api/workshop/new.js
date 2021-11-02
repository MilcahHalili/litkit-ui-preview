import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const workshop = await prisma.workshop.create({
        data: {
          instructorId: 1,
          name: req.body.name
        }
      })
      res.status(200).json(workshop)
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