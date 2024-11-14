"use client";

import Image from "next/image";
import { signIn } from "next-auth/react";

export default function SignInBtn() {
  return (
    <button
      onClick={() => signIn("google")}
      className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
    >
      <Image src="/google-logo.png" alt="img" height={30} width={30} />
      <span className="bg-green-600 hover:bg-green-700 rounded-r-md text-white px-4 py-3">
        Sign in with Google
      </span>
    </button>
  );
}