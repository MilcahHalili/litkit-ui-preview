import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const isUser = await prisma.user.findUnique({
        where: {
          email: req.body.email
        }
      })
      if (isUser) {
        console.log(isUser)
      } else {
        const user = await prisma.user.create({
          data: {
            email: req.body.email,
            name: ''
          }
        })
        res.status(200).json(user)
      }
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