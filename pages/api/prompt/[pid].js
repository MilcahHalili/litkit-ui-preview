import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  const { pid } = req.query
  
  async function main() {
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: parseInt(pid)
      },
      include: {
        posts: true,
        instructor: true
      }
    })
    console.log(prompt)
    console.log('🔵🔵🔵', parseInt(pid))
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