import prisma from "../config/database-config.js";
import { app } from "../server.js";

export default function useDefaultRoute() {
	app.get("/", async (req, res) => {

        await prisma.role.deleteMany()
		
		const userCreateInfo = await prisma.role.createMany({
			data: [
			  {
				name: "ADMIN"
			  },
			  {
				name: "WARD",
			  },
			  {
				name: "COUNTY",
			  },
			  {
				name: "NATIONAL",
			  },
			]
		  });

		res.json({
			message: "REST Service is running correctly!",
			userCreateInfo
		})
	})
}