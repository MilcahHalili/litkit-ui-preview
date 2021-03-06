import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  const { wid } = req.query;
  async function main() {
    const prompts = await prisma.prompt.findMany({
      where: {
        workshopId: parseInt(wid)
      },
      include: {
        posts: true,
        category: true
      }
    })
    res.status(200).json(prompts)
  }

  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}