import { PrismaClient } from "@prisma/client";

export default function handler(req, res) {
	const prisma = new PrismaClient();

	async function main() {
		const workshops = await prisma.workshop.findMany({});
		res.status(200).json(workshops);
	};

	main()
		.catch(e => {
			throw e
		})
		.finally(async () => {
			await prisma.$disconnect()
		});
}