import {
  PaperAirplaneIcon,
  PhotoIcon,
  PlusCircleIcon,
  MicrophoneIcon,
  ComputerDesktopIcon,
  ChatBubbleLeftEllipsisIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useSession } from '../../providers/session';
import React, { Fragment, useEffect, useState } from 'react';
import { createMessage } from 'queries/mutations';
import { useApp } from 'providers/chat';
import { API } from 'aws-amplify';
import { listMessagesForRoom, listRooms } from 'queries/queries';
import { graphqlOperation, GraphQLQuery, GraphQLSubscription } from '@aws-amplify/api';
import { ListMessagesForRoomQuery, ListRoomsQuery, OnCreateMessageByRoomIdSubscription } from 'queries';
import { onCreateMessageByRoomId } from 'queries/subscriptions';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToBottom } from 'utils/page';
import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

type Room = {
  __typename: 'Room';
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
} | null;

export default function ChatBox() {
  type StateProps = string;
  const { user } = useSession();
  const { chatSession, setState: setAppState } = useApp();
  const [message, setMessage] = useState<StateProps>('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState<Room>(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = event => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log('fileObj is', fileObj);
    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };

  const sendMessage = async () => {
    const payload = {
      input: {
        content: {
          text: message
          // , imageId: message
        },
        roomId: chatSession
      }
    };
    try {
      await API.graphql({
        query: createMessage,
        variables: payload
      });
      setMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function subscribe() {
      const subscription = (
        await API.graphql<GraphQLSubscription<OnCreateMessageByRoomIdSubscription>>(
          graphqlOperation(onCreateMessageByRoomId, { roomId: chatSession })
        )
      ).subscribe({
        next: ({ value }) => {
          setMessages(messages => [...messages, value.data.onCreateMessageByRoomId]);
          scrollToBottom(messagesEndRef);
        }
      });

      subscription.unsubscribe();
    }
    if (chatSession) {
      subscribe();
    }
  }, [chatSession]);

  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = await API.graphql<GraphQLQuery<ListMessagesForRoomQuery>>(
          graphqlOperation(listMessagesForRoom, { roomId: chatSession })
        );
        const { data: roomData } = await API.graphql<GraphQLQuery<ListRoomsQuery>>(
          graphqlOperation(listRooms, { roomId: chatSession })
        );
        setRoom(roomData.listRooms.items[0]);
        setMessages(data.listMessagesForRoom.items);
      } catch (err) {
        console.log(err);
      }
    }
    if (chatSession) {
      getMessages();
    }
  }, [chatSession]);

  return (
    <div
      className={classNames(
        chatSession ? 'md:flex' : 'hidden md:flex',
        'flex flex-col h-full w-full bg-white dark:bg-slate-700 px-4 py-6'
      )}
    >
      {chatSession && (
        <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow bg-gray-100 dark:bg-slate-800">
          {room && (
            <>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
                {room.name[0]}
              </div>
              <div className="flex flex-col ml-3">
                <div className="font-semibold text-sm dark:text-slate-300">{room.name}</div>
                <div className="text-xs text-gray-500 dark:text-slate-400">Active</div>
              </div>
            </>
          )}
          <div className="ml-auto">
            <div
              onClick={() => setAppState(s => ({ ...s, chatSession: null }))}
              className="cursor-pointer flex items-center justify-center bg-gray-200  dark:bg-slate-700 shadow text-gray-400 h-10 w-10 rounded-full"
            >
              <ArrowLeftOnRectangleIcon className="w-6 h-6" />
            </div>
          </div>
        </div>
      )}

      <div className="h-full overflow-hidden py-4">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-12 gap-y-2">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => {
                //Other user
                if (user && user.username !== message.owner)
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        opacity: { duration: 0.5 },
                        layout: {
                          duration: index * 0.05
                        }
                      }}
                      key={index}
                      className="col-start-1 col-end-8 p-3 rounded-lg"
                    >
                      <div className="flex flex-row items-center">
                        <div className="relative ml-3 text-sm bg-white dark:bg-slate-100 py-2 px-4 shadow rounded-xl">
                          <div>{message.content.text}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      opacity: { duration: 0.5 },
                      layout: {
                        duration: index * 0.05
                      }
                    }}
                    key={index}
                    className="col-start-6 col-end-13 p-3 rounded-lg"
                  >
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        {user.attributes.email[0].toUpperCase()}
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 dark:bg-slate-400 py-2 px-4 shadow rounded-xl">
                        <div>{message.content.text}</div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          <div ref={messagesEndRef} />
          {messages.length === 0 && (
            <div className="flex w-full h-full justify-center items-center">
              <div className="text-center w-full flex-col flex justify-center items-center">
                <div className="">
                  <ChatBubbleLeftEllipsisIcon className="dark:text-slate-300 w-12 h-12" />
                </div>
                <h3 className="mt-2 text-sm font-medium dark:text-gray-400">No Messages</h3>
                <p className="mt-1 text-sm dark:text-slate-300">Get the conversation started by sending a message</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {messages && messages.length > 0 && (
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
            <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
              <MicrophoneIcon className="w-5 h-5" />
            </button>
            <div className="w-full">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') sendMessage();
                }}
                className="bg-white dark:bg-slate-700 dark:text-slate-300 px-2 md:px-8 rounded-lg border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                placeholder="Type your message...."
              />
            </div>
            <div className="flex flex-row">
              <div className="w-full text-right">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button>
                      <button className="flex items-center justify-center h-10 w-8 text-gray-400">
                        <input className="hidden" ref={inputRef} type="file" onChange={handleFileChange} />
                        <PlusCircleIcon className="w-6 h-6" />
                      </button>
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
                    <Menu.Items className="z-10 absolute right-0 mt-2 w-72 -top-20 origin-bottom-right divide-y dark:divide-slate-600 divide-gray-300 rounded-md bg-white dark:bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="px-1 py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleClick}
                              className={`${
                                active
                                  ? 'dark:bg-slate-700 dark:text-slate-100 bg-gray-200 text-gray-500'
                                  : 'dark:text-white text-gray-500 dark:bg-slate-800 bg-white'
                              } group flex w-full items-center rounded-md px-8 py-2 text-sm font-semibold truncate `}
                            >
                              {active ? (
                                <ComputerDesktopIcon className="mr-2 h-5 w-5 text-slate-500" aria-hidden="true" />
                              ) : (
                                <ComputerDesktopIcon className="mr-2 h-5 w-5 text-slate-500" aria-hidden="true" />
                              )}
                              <span className="w-full">Upload from your device</span>
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
                <PhotoIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div onClick={() => sendMessage()} className="ml-6">
            <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200  dark:text-slate-300 dark:bg-slate-500  text-gray-500">
              <PaperAirplaneIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
