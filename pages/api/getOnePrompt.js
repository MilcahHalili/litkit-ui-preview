import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()

  async function main(id) {
    const prompt = await prisma.prompt.findUnique({
      where: {
        id: 9 // replace with id param
      },
      include: {
        posts: true,
        instructor: true
      }
    })
    console.log(prompt)
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