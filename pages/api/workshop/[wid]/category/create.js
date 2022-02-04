import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const category = await prisma.category.create({
        data: {
          name: req.body.name,
          workshopId: parseInt(req.body.workshopId),
        }
      });
      res.status(200).json(category)
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