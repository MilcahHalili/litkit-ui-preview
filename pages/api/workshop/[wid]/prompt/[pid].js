import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  const { pid } = req.query;
  async function main() {
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: parseInt(pid)
      },
      include: {
        author: true
      }
    })
    const posts = await prisma.post.findMany({
      where: {
        promptId: parseInt(pid)
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true
          }
        }
      }
    })
    res.status(200).json([prompt, posts]);
  }

  main()
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
} 