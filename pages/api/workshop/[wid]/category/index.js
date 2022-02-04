import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  const { wid } = req.query
  async function main() {
    const category = await prisma.category.findMany({
      where: {
        workshopId: parseInt(wid)
      }
    })
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