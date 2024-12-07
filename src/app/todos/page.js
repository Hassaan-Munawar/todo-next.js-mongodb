import ListItem from "@/components/ListItem";
import TodoForm from "@/components/TodoForm";
import UserInfo from "@/components/UserInfo";
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { connectDB } from "../lib/dbConnect";
import TodoModal from "../lib/moodals/todoModal";

export default async function Todos() {
    const session = await getServerSession(authOptions);
    await connectDB();
    const userId = session.user.id;
    const todos = await TodoModal.find({ user: userId });

    return (
        <div className="min-h-screen bg-gray-100">
            <UserInfo />
            <h1 className="text-4xl text-center font-bold mb-8 text-indigo-600">Todo List</h1>
            <TodoForm />
            <div className="mt-2 flex justify-center">
                <div className="grid p-4 gap-6 w-full max-w-md">
                    {todos.map((data) => (
                        <ListItem key={data._id} data={data} />
                    ))}
                </div>
            </div>
        </div>
    );
}