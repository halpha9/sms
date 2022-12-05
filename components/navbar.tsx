import Link from 'next/link';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { MoonIcon as MIcon } from '@heroicons/react/24/solid';
import { useSession } from '../providers/session';
import { Menu, Transition } from '@headlessui/react';
import { useTheme } from 'next-themes';

function NavBar() {
  const { signOut } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const { register } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full p-4 px-10 bg-gray-100 border-b border-gray-200 dark:border-slate-600 pb-5 dark:bg-slate-800 flex justify-between items-center">
      <div className="flex-1">
        <Link href="/" passHref>
          <ChatBubbleLeftEllipsisIcon className="w-8 h-8 dark:text-slate-400 text-gray-500" />
        </Link>
      </div>

      <div className="self-end flex items-center space-x-4">
        <div className="flex space-x-2 items-center">
          <input
            className="bg-white dark:bg-slate-700 border-2 border-gray-300 p-2 rounded-md dark:text-slate-400 text-sm px-4"
            placeholder="Search"
            {...register('search')}
          />
          <MagnifyingGlassIcon className="text-gray-500 dark:text-slate-400 w-7 h-7" />
        </div>
        <div className="w-56 text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="rounded-full dark:bg-slate-400 bg-gray-400 w-10 h-10" />
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right divide-y dark:divide-slate-600 divide-gray-300 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Link href="/profile" passHref>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? 'dark:bg-slate-600 dark:text-slate-100 bg-gray-200 text-gray-500'
                              : 'dark:text-white text-gray-400 bg-white'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <UserIcon className="mr-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                          ) : (
                            <UserIcon className="mr-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                          )}
                          Profile
                        </button>
                      )}
                    </Menu.Item>
                  </Link>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`${
                          active
                            ? 'dark:bg-slate-600 dark:text-slate-100 bg-gray-200 text-gray-500'
                            : 'dark:text-white text-gray-400 bg-white'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                        ) : (
                          <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 text-slate-400" aria-hidden="true" />
                        )}
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
        <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
          {resolvedTheme === 'dark' ? (
            <MoonIcon className="w-6 h-6 text-slate-400" />
          ) : (
            <MIcon className="w-6 h-6 text-slate-400" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
