import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useSession } from "../providers/session";

function NavBar() {
  const { register } = useForm({ mode: "all", reValidateMode: "onChange" });
  const { signOut } = useSession();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full p-4 px-10 border-b border-slate-600 pb-5 bg-slate-800 flex justify-between items-center">
      <div className="flex-1">
        <Link href="/" passHref>
          <p className="text-gray-200">SMS</p>
        </Link>
      </div>

      <div className="self-end flex items-center space-x-8">
        <div className="flex space-x-2 items-center">
          <input
            className="bg-slate-700 p-2 rounded-md text-slate-400 text-sm px-4"
            placeholder="Search"
            {...register("search")}
          />
          <MagnifyingGlassIcon className="text-slate-400 w-7 h-7" />
        </div>
        <div className="rounded-full bg-slate-400 w-10 h-10" />
        <button onClick={handleLogout} className="rounded-md bg-slate-700 p-2 ">
          <p className="text-gray-200 px-4 text-base font-medium">Logout</p>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
