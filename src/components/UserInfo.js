"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LogoutIcon } from "@heroicons/react/outline";

export default function UserInfo() {
  const { data: session } = useSession();

  return (
    <div className="grid md:place-items-center lg:place-items-end rounded-md mb-4">
  <div className="p-8 flex flex-col md:flex-row items-center justify-between rounded-md gap-4 w-full">
    <div className="flex items-center gap-2 text-gray-900">
      <span className="text-4xl">👋</span> 
      <span className="text-2xl">Hi, <span className="text-2xl">{session?.user?.name}</span></span>
    </div>

    <button
      onClick={() => signOut()}
      className="bg-red-500 text-white flex items-center justify-center rounded px-6 py-2 mt-3 md:mt-0"
    >
      <LogoutIcon className="w-5 h-5 mr-1" /> Logout
    </button>
  </div>
</div>
  );
}