import { connectDB } from "@/app/lib/dbConnect";
import TodoModal from "@/app/lib/moodals/todoModal";


export async function GET(request) {
    try {
        await connectDB();
        const  todos = await TodoModal.find()
        return Response.json({
            data: todos,
            message: 'Todos Fetched Successfully'
        });
    } 
    catch (error) {
        return Response.json({ message: 'Error fetching todos', error }, { status: 500 });
    }
}

export async function POST(request) {

    try {
        connectDB();
        const data = await request.json();
        const newTodo = new TodoModal({
            ...data,
            isCompleted: false
        });
        await newTodo.save();

        const todos = await TodoModal.find();
        return Response.json({
            data: todos,
            message: "Todo Added Successfully"
        });
    } catch (error) {
        return Response.json({ message: 'Error adding todo', error });
    }
}

export async function PUT(request) {
    try {
        connectDB();
        const data = await request.json();
        await TodoModal.findByIdAndUpdate(data._id, data, { new: true });

        const todos = await TodoModal.find();
        return Response.json({
            data: todos,
            message: "Todo Updated Successfully"
        });
    } catch (error) {
        return Response.json({ message: 'Error updating todo', error });
    }
}

export async function DELETE(request) {
    try {
        connectDB();
        const data = await request.json();
        await TodoModal.findByIdAndDelete(data.id);

        const todos = await TodoModal.find();
        return Response.json({
            data: todos,
            message: "Todo Deleted Successfully"
        });
    } catch (error) {
        return Response.json({ message: 'Error deleting todo', error });
    }
}

