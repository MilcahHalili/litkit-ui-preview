import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  const { id } = req.query
  
  async function main() {
    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        author: true
      }
    })
    const comments = await prisma.comment.findMany({
      where: {
        postId: parseInt(id)
      },
      include: {
        author: true
        }
      }
    )
    console.log('🔵🔵🔵', parseInt(id))
    res.status(200).json([post, comments])
  }

  main()
    .catch(e => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
} 