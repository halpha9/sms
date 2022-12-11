import Link from 'next/link';
import React, { Fragment, useEffect } from 'react';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  MoonIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { MoonIcon as MIcon, UserIcon as UIcon } from '@heroicons/react/24/solid';
import { useSession } from '../providers/session';
import { Menu, Transition, Combobox } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { API, graphqlOperation } from 'aws-amplify';
import { listRooms } from 'queries/queries';
import { ListRoomsQuery } from 'queries';
import { format, parseISO } from 'date-fns';
import { useApp } from 'providers/chat';
import { GraphQLQuery } from '@aws-amplify/api';

type Room = {
  __typename: 'Room';
  id: string;
  name: string;
  createdAt?: string | null;
  updatedAt?: string | null;
};

function NavBar() {
  const { signOut } = useSession();
  const { resolvedTheme, setTheme } = useTheme();
  const { setState: setAppState, chatSession } = useApp();
  const [rooms, setRooms] = useState(null);
  const [selected, setSelected] = useState(null);
  const [query, setQuery] = useState('');

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function getMessages() {
      try {
        const { data: roomData } = await API.graphql<GraphQLQuery<ListRoomsQuery>>(graphqlOperation(listRooms));
        setRooms(roomData.listRooms.items);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, []);

  const moveToRoom = (room: string) => {
    try {
      if (chatSession !== room) {
        setAppState(s => ({ ...s, chatSession: room }));
      } else {
        setAppState(s => ({ ...s, chatSession: '' }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredRooms =
    query === ''
      ? rooms
      : rooms.filter(room =>
          room.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className="w-full p-4 px-10 bg-gray-100 border-b border-gray-200 dark:border-slate-600 pb-5 dark:bg-slate-800 flex justify-between items-center">
      <div className="flex-1">
        <Link href="/" passHref>
          <ChatBubbleLeftEllipsisIcon className="w-8 h-8 dark:text-slate-400 text-gray-400" />
        </Link>
      </div>

      <div className="self-end flex items-center space-x-4">
        <div className="w-96">
          <Combobox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                <Combobox.Input
                  className="bg-white dark:bg-slate-700 border-2 border-gray-300 p-2 rounded-lg dark:text-slate-400 text-sm px-4 w-full"
                  displayValue={(room: Room) => (room ? room.name : 'Select A Room')}
                  onChange={event => setQuery(event.target.value)}
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </Combobox.Button>
              </div>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="z-10 absolute right-0 mt-8 w-full origin-top-right divide-y dark:divide-slate-600 divide-gray-300 rounded-lg bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {filteredRooms && filteredRooms.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700 dark:text-slate-400 text-sm">
                      Nothing found.
                    </div>
                  ) : (
                    filteredRooms &&
                    filteredRooms.map(room => (
                      <Combobox.Option
                        key={room.id}
                        onClick={() => moveToRoom(room.id)}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 m-1 ${
                            active
                              ? ' dark:text-slate-100 dark:bg-slate-600 bg-gray-200  rounded-lg text-gray-500'
                              : 'dark:text-white  text-gray-500 '
                          }`
                        }
                        value={room}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className="block truncate text-sm text-gray-400 dark:text-slate-300">
                              {room.name}
                            </span>
                            <span className="block truncate text-xs text-gray-400 dark:text-slate-300">
                              <span className="font-medium text-gray-500 dark:text-slate-400">Started:</span>
                              {format(parseISO(room.createdAt), '	PPP')} at {format(parseISO(room.createdAt), 'p')}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-2 ${
                                  active ? 'text-white' : 'text-slate-600'
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5 dark:text-slate-300 text-gray-400 mr-3"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  )}
                </Combobox.Options>
              </Transition>
            </div>
          </Combobox>
        </div>
        <div className="w-56 text-right">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="rounded-full dark:bg-slate-400 bg-gray-300 border-2 border-gray-300 dark:border-none  w-10 h-10 flex justify-center items-center">
                <UIcon className="w-6 h-6 text-slate-200" />
              </Menu.Button>
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
                              : 'dark:text-white dark:bg-slate-800 text-gray-500 bg-white'
                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <UserIcon className="mr-2 h-5 w-5 text-slate-500" aria-hidden="true" />
                          ) : (
                            <UserIcon className="mr-2 h-5 w-5 text-slate-500" aria-hidden="true" />
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
                            : 'dark:text-white text-gray-500 dark:bg-slate-800 bg-white'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <ArrowRightOnRectangleIcon className="mr-2 h-5 w-5 text-slate-500" aria-hidden="true" />
                        ) : (
                          <ArrowLeftOnRectangleIcon className="mr-2 h-5 w-5 text-slate-500" aria-hidden="true" />
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
            <MIcon className="w-7 h-7 text-slate-300" />
          ) : (
            <MoonIcon className="w-7 h-7 text-slate-300" />
          )}
        </button>
      </div>
    </div>
  );
}

export default NavBar;
