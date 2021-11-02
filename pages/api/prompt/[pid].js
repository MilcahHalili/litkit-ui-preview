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
        instructor: true
      }
    })
    const posts = await prisma.post.findMany({
      include: {
        author: true,
        comments: {
          include: {
            author: true,
            instructor: true
          }
        }
      }
    })
    console.log('🔵🔵🔵', parseInt(pid))
    res.status(200).json([prompt, posts])
  }

  main()
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
} 