"use server"
import { revalidatePath } from "next/cache"

export async function addTodo(formData,id) {
    const todo = formData.get('todo');
    try {
        await fetch(`${process.env.BASE_URL}/api/todos`, {
            method: "POST",
            body: JSON.stringify({ todo,user:id })
        });
        revalidatePath('/todos');
    }
    catch (error) {
        console.error('Error adding todo:', error);
    }
}

export async function updateTodo(obj) {
    try {
        await fetch(`${process.env.BASE_URL}/api/todos`, {
            method: "PUT",
            body: JSON.stringify(obj)
        });

        revalidatePath('/todos');
    } catch (error) {
        console.error('Error updating todo:', error);
    }
}

export async function deleteTodo(obj) {
    try {
        await fetch(`${process.env.BASE_URL}/api/todos`, {
            method: "DELETE",
            body: JSON.stringify(obj)
        });

        revalidatePath('/todos');
    } catch (error) {
        console.error('Error deleting todo:', error);
    }
}
