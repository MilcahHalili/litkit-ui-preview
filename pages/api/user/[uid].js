import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  const { uid } = req.query
  async function main() {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(uid)
      },
      include: {
        workshops: true
      }
    })
    res.status(200).json(user)
  }
  
  main()
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
} 