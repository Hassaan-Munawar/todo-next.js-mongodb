"use client";

import { deleteTodo, updateTodo } from "@/actions/todos";
import { useState } from "react";
import { CheckIcon, XIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import toast, { Toaster } from "react-hot-toast";


export default function ListItem({ data }) {
    const [isEdit, setIsEdit] = useState(false);
    const [task, setTask] = useState(data.todo);
    const [loadingdone,setLoadingdone] = useState(false)
    const [loadingedit,setLoadingedit] = useState(false)
    const [loadingdelete,setLoadingdelete] = useState(false)

    const onComplete = async () => {
        setLoadingdone(true)
        const updatedTodo = { ...data, isCompleted: !data.isCompleted };
        await updateTodo(updatedTodo);
        setLoadingdone(false)
    };

    const onEdit = async () => {
        if (isEdit && task) {
            setLoadingedit(true)
            const updatedTodo = { ...data, todo: task };
            await updateTodo(updatedTodo);
            setIsEdit(false);
            setLoadingedit(false)
        }
        else if(!task){
            toast.error('Task cannot be empty!')
        }
         else {
            setIsEdit(true);
        }
    };

    const onDelete = async () => {
        setLoadingdelete(true)
        await deleteTodo({ id: data._id });
        setLoadingdelete(false)
    };

    return (
        <div
        className={`flex items-center gap-2 p-4 rounded-xl shadow-lg w-full max-w-md ${
          data.isCompleted ? "bg-green-400" : "bg-white"
        }`}
      >
        <Toaster position="top-right" />
        {isEdit ? (
          <input
            className="flex-grow border-2 w-full border-blue-200 rounded-lg p-1 text-gray-900 focus:outline-none focus:border-purple-400"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        ) : (
          <h1
            className={`flex-grow text-base text-gray-900 ${
              data.isCompleted ? "line-through" : ""
            }`}
          >
            {data.todo}
          </h1>
        )}
        <button
          onClick={onComplete}
          className="text-green-500 bg-green-100 p-2 rounded-full hover:bg-green-200 transition-colors"
          aria-label={data.isCompleted ? "Undo Task" : "Mark as Done"}
        >
          {data.isCompleted ? (
            loadingdone ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-green-500 border-opacity-75"></div>
            ) : (
              <XIcon className="w-5 h-5" />
            )
          ) : loadingdone ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-green-500 border-opacity-75"></div>
          ) : (
            <CheckIcon className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={onEdit}
          className="text-blue-500 bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition-colors"
          aria-label="Edit Task"
        >
          {isEdit ? (
            loadingedit ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500 border-opacity-75"></div>
            ) : (
              <CheckIcon className="w-5 h-5" />
            )
          ) : loadingedit ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500 border-opacity-75"></div>
          ) : (
            <PencilIcon className="w-5 h-5" />
          )}
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 bg-red-100 p-2 rounded-full hover:bg-red-200 transition-colors"
          aria-label="Delete Task"
        >
          {loadingdelete ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-red-500 border-opacity-75"></div>
          ) : (
            <TrashIcon className="w-5 h-5" />
          )}
        </button>
      </div>
    );
}



