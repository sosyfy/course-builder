import express from "express";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { app } from "../server.js";

//middlewares
import cors from "../middlewares/cors.js";
import trimBody from "../middlewares/trimBody.js";

export default function() {
    
	app.use(cors());
	app.use(cookieParser());
	app.use(bodyParser.json({
		limit: "200kb"
	}));
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(trimBody());
	app.use("/uploads", express.static("uploads"))//test here -> http://localhost:3000/uploads/rest-api.png
}