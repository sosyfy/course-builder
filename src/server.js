import express from "express";
import dotenv from "dotenv";
dotenv.config();

//configurations
import expressConfiguration from "./config/express-config.js";

//routes
import routes from "./routes/routes.js";
import useDefaultRoute from "./routes/default-routes.js";


export const app = express();

expressConfiguration();

app.use(routes);
useDefaultRoute();


app.listen(
	process.env["PORT"],
	() => 
		console.log("Server listening on port " + process.env["PORT"])
)