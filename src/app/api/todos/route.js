import { connectDB } from "@/app/lib/dbConnect";
import todoModal from "@/app/lib/moodals/todoModal";


export async function GET(request) {
    try {
        await connectDB();
        const  todos = await todoModal.find()
        return Response.json({
            data: todos,
            message: 'Todos Fetched Successfully'
        }, { status: 200 });
    } 
    catch (error) {
        return Response.json({ message: 'Error fetching todos', error }, { status: 500 });
    }
}

export async function POST(request) {

    try {
        connectDB();
        const data = await request.json();
        const newTodo = new todoModal({
            ...data,
            isCompleted: false
        });
        await newTodo.save();

        const todos = await todoModal.find();
        return Response.json({
            data: todos,
            message: "Todo Added Successfully"
        });
    } catch (error) {
        return Response.json({ message: 'Error adding todo', error }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        connectDB();
        const data = await request.json();
        await todoModal.findByIdAndUpdate(data._id, data, { new: true });

        const todos = await todoModal.find();
        return Response.json({
            data: todos,
            message: "Todo Updated Successfully"
        });
    } catch (error) {
        return Response.json({ message: 'Error updating todo', error }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        connectDB();
        const data = await request.json();
        await todoModal.findByIdAndDelete(data.id);

        const todos = await todoModal.find();
        return Response.json({
            data: todos,
            message: "Todo Deleted Successfully"
        });
    } catch (error) {
        return Response.json({ message: 'Error deleting todo', error }, { status: 500 });
    }
}

