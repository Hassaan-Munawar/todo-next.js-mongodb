import { connectDB } from "@/app/lib/dbConnect";
import User from "@/app/lib/moodals/userModal";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB()
        const {email} = await req.json()
        const user = await User.findOne({email}).select("_id")
        return NextResponse.json({user})
        
    } catch (error) {
        console.log(error)
    }
}