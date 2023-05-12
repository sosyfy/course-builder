import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//model
import prisma from "../config/database-config.js";



export async function register(email, password, roles, otp) {
	const existingEmail = await prisma.user.findUnique({
		where: {
			email: email
		}
	})

	if (existingEmail) {
		throw new Error("Email is taken!")
	}

	const hashedPassword = await bcrypt.hash(password, Number(process.env["SALT"]))

	const foundRoles = await prisma.role.findMany({
		where: { name: { in: roles } },
	});

	const user = await prisma.user.create({
		data: {
			email,
			hashedPassword,
			isConfirmed: true,
			confirmOTP: otp,
			userRoles: {
				connect: foundRoles.map((role) => ({ id: role.id })),
			},
		},
		include: {
			userRoles: true
		},
	})

	return {
		"message": "User created successfully",
		"id": user.id,
		"email": user.email,
		"isConfirmed": user.isConfirmed,
		"status": user.status,
		"userRoles": user.userRoles 
	}
}


export async function login(email, password) {
	const existingEmail = await prisma.user.findUnique({
		where: {
			email: email
		},
		include: {
			userRoles: true
		}
	})

	if (!existingEmail) {
		throw new Error("Incorrect email or password!",)
	}

	const matchPassword = await bcrypt.compare(password, existingEmail.hashedPassword)

	if (!matchPassword) {
		throw new Error("Incorrect email or password!")
	}

	return createToken(existingEmail)
}


function createToken({ email, id, userRoles, isConfirmed, status }) {
	const payload = {
		email,
		id,
		userRoles,
		isConfirmed,
		status
	}

	const token = jwt.sign(payload, process.env["JWT_SECRET"], {
		expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
	});

	return {
		...payload,
		accessToken: token
	}

}

let tokenBlackList = new Set();

export function logout(token) {
	tokenBlackList.add(token);
}