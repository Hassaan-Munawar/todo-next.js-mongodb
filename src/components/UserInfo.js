"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LogoutIcon } from "@heroicons/react/outline";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid md:place-items-center lg:place-items-end rounded-md">
    <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col rounded-md gap-2 my-6">
      <div className="font-semibold text-gray-900">
        Name: <span className="font-normal">{session?.user?.name}</span>
      </div>
      <div className="font-semibold text-gray-900">
        Email: <span className="font-normal">{session?.user?.email}</span>
      </div>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white flex items-center justify-center rounded px-6 py-2 mt-3"
      >
        <LogoutIcon className="w-5 h-5 mr-1" /> Logout
      </button>
    </div>
  </div>  
  );
}