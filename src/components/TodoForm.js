"use client";

import { addTodo } from "@/actions/todos";
import { useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";


export default function TodoForm() {
    const { data: session } = useSession();
    const formRef = useRef(null);
    const [loading,setLoading] = useState()

    const handleSubmit = async (formData) => {
        setLoading(true)
        const todo = formData.get("todo");
        if (!todo.trim()) { 
            toast.error("Please enter a task!");
            setLoading(false)
            return;
        }
        await addTodo(formData,session?.user?.id);
        formRef.current.reset();
        setLoading(false)
    };

    return (
        <div>
            <Toaster position="top-right" />
            <form
                className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto flex items-center gap-3 p-4"
                ref={formRef}
                action={handleSubmit}
            >
                <input
                    className="border-2 border-blue-200 rounded-lg p-2 flex-grow text-base text-gray-900 dark:text-gray-900 placeholder-gray-500 focus:outline-none focus:border-2 focus:border-purple-400 transition-shadow"
                    name="todo"
                    placeholder="Add a new task"
                    type="text"
                />
                <button
                    className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-2 rounded-lg shadow-md hover:shadow-lg hover:from-purple-600 hover:to-indigo-600 transition-all"
                    type="submit"
                    aria-label="Add Todo"
                >
                   {loading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white-500 border-opacity-75"></div> : <PlusIcon className="w-6 h-6" />} 
                </button>
            </form>
        </div>
    );
}




