import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()

  async function main() {
    const prompts = await prisma.prompt.findMany()
    console.log(prompts)
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