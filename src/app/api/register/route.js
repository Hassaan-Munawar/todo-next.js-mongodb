import User from "@/app/lib/moodals/userModal"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { connectDB } from "@/app/lib/dbConnect"

export async function POST(req) {
    try {
        const { email, name, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 10)
        await connectDB()
        await User.create({ name, email, password: hashedPassword })
        return NextResponse.json({
            message: "User registered."
        }, { status: 201 }
        )
    } catch (error) {
        return NextResponse.json({
            message: "An error occured while registering the user."
        }, { status: 500 })
    }
}