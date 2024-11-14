import mongoose from "mongoose"

export async function connectDB() {

    let isconnected = false
    if(isconnected){
        return "DB is already connected"
    }
    try {
        let connected = await mongoose.connect(process.env.MONGODB_URI)
        if(connected.connection.readyState == 1) isconnected = true
    } catch (error) {
        console.error(error)
    }
}