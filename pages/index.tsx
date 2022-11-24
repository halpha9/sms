import {
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "../providers/session";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
  const router = useRouter();
  const { user } = useSession();
  const { register } = useForm({ mode: "all", reValidateMode: "onChange" });

  const [state, setState] = useState({
    openSession: false,
  });

  const array = ["green", "orange", "slate", "purple"];

  return (
    <div className="flex min-h-screen bg-slate-800 flex-col items-center justify-center p-2 px-8">
      <div className="border border-slate-700 w-full h-screen rounded-md flex">
        <div className="w-4/12 border bg-slate-900 border-white rounded-lg overflow-hidden">
          <div className="border-b border-slate-400">
            <div className="flex space-x-2 items-center justify-between p-8 h-24">
              <p className="text-slate-400 text-2xl font-medium">Chats</p>
              <div className="space-x-3 items-center hidden lg:flex">
                <input
                  className="bg-slate-700 p-2 rounded-md text-slate-400 text-sm px-4"
                  placeholder="Search"
                  {...register("search")}
                />
                <MagnifyingGlassIcon className="text-slate-400 w-7 h-7" />
              </div>
            </div>
          </div>
          <div className="flex-col divide-y divide-slate-700">
            {array.map((item, index) => (
              <motion.div
                onClick={() =>
                  setState({ ...state, openSession: !state.openSession })
                }
                whileHover={{
                  opacity: 0.8,
                }}
                whileTap={{ scale: 0.98 }}
                className="h-24 bg-slate-800 flex items-center px-8"
              >
                <div
                  className={`w-14 h-14 rounded-lg bg-${item}-400 shadow-sm`}
                />
                <div className="px-5">
                  <p className="text-slate-400 text-lg font-medium truncate">
                    John Doe
                  </p>
                  <p className="text-slate-400 text-sm truncate">@harryalpha</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="w-8/12 bg-slate-900 border border-blue-100 rounded-md ">
          <div className="border-b p-8 flex items-center justify-between h-24">
            <div className="flex items-center">
              <p className="text-4xl font-semibold text-slate-400">
                Harry Alpha
              </p>
              <p className="hidden lg:inline text-md font-light text-slate-400 px-10">
                {user && (
                  <p className="text-gray-400">{user.attributes.email}</p>
                )}
              </p>
            </div>
            <EllipsisHorizontalIcon className="w-7 h-7 text-slate-400" />
          </div>
          <AnimatePresence>
            {state.openSession && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 0.2, delay: 0.15 }}
                className="h-full bg-slate-800"
              ></motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Home;
