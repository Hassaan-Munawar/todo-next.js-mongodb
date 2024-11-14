import ListItem from "@/components/ListItem";
import TodoForm from "@/components/TodoForm";
import UserInfo from "@/components/UserInfo";
import { getServerSession } from 'next-auth';
import { authOptions } from "../api/auth/[...nextauth]/route";
import { connectDB } from "../lib/dbConnect";
import todoModal from "../lib/moodals/todoModal";

export default async function Todos() {
    const session = await getServerSession(authOptions);
    await connectDB();
    const userId = session.user.id;
    const todos = await todoModal.find({ user:userId });

    return (
        <div className="min-h-screen p-6 md:p-12 bg-gray-100">
            <UserInfo />
            <h1 className="text-4xl text-center font-bold mb-8 text-indigo-600">Todo List</h1>
            <TodoForm />
            <div className="mt-8 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {todos.map((data) => (
                    <ListItem key={data._id} data={data} />
                ))} 
            </div>
        </div>
    );
}