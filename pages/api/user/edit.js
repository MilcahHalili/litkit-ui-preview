import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const user = await prisma.user.update({
        where: {
          email: ''
        },
        data: {
          name: 'Milcah'
        }
      })
      console.log(user)
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