import { PrismaClient } from '@prisma/client'

export default function handler(req, res) {
  const prisma = new PrismaClient()
  if (req.method === 'POST') {
    async function main() {
      const user = await prisma.user.update({
        where: {
          email: req.body.email
        },
        data: {
          name: req.body.name
        }
      })
      console.log(user)
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
}