import {
  PaperAirplaneIcon,
  PaperClipIcon,
  PhotoIcon,
  MicrophoneIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { useSession } from '../../providers/session';
import React, { useEffect, useState } from 'react';
import { createMessage } from 'queries/mutations';
import { useApp } from 'providers/chat';
import { API } from 'aws-amplify';
import { listMessagesForRoom, listRooms } from 'queries/queries';
import { graphqlOperation } from '@aws-amplify/api';
import { ListMessagesForRoomQuery, ListRoomsQuery } from 'queries';
import { onCreateMessageByRoomId } from 'queries/subscriptions';
import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollToBottom } from 'utils/page';
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
  const { chatSession } = useApp();
  const [message, setMessage] = useState<StateProps>('');
  const [messages, setMessages] = useState([]);
  const [room, setRoom] = useState<Room>(null);
  const messagesEndRef = useRef(null);

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
      //@ts-ignore
      (await API.graphql(graphqlOperation(onCreateMessageByRoomId, { roomId: chatSession }))).subscribe({
        next: ({ value }) => {
          setMessages(messages => [...messages, value.data.onCreateMessageByRoomId]);
          scrollToBottom(messagesEndRef);
        }
      }) as {
        data: ListMessagesForRoomQuery;
        errors: any[];
      };
    }
    if (chatSession) {
      subscribe();
    }
  }, [chatSession]);

  useEffect(() => {
    async function getMessages() {
      try {
        const { data } = (await API.graphql(graphqlOperation(listMessagesForRoom, { roomId: chatSession }))) as {
          data: ListMessagesForRoomQuery;
          errors: any[];
        };
        const { data: roomData } = (await API.graphql(graphqlOperation(listRooms, { roomId: chatSession }))) as {
          data: ListRoomsQuery;
          errors: any[];
        };
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
    <div className="flex flex-col h-full w-full bg-white dark:bg-slate-700 px-4 py-6">
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
          <ul className="flex flex-row items-center space-x-2">
            <li>
              <div className="flex items-center justify-center bg-gray-200  dark:bg-slate-700 shadow text-gray-400 h-10 w-10 rounded-full">
                <span>
                  <EllipsisVerticalIcon className="w-6 h-6" />
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-full overflow-hidden py-4">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-12 gap-y-2">
            <AnimatePresence initial={false}>
              {messages &&
                messages.length > 0 &&
                messages.map((message, index) => {
                  if (user.username !== message.owner)
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
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>
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
                          A
                        </div>
                        <div className="relative mr-3 text-sm bg-indigo-100 dark:bg-slate-400 py-2 px-4 shadow rounded-xl">
                          <div>{message.content.text}</div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

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
              className="bg-white dark:bg-slate-700 dark:text-slate-300 px-8 rounded-lg border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
              placeholder="Type your message...."
            />
          </div>
          <div className="flex flex-row">
            <button className="flex items-center justify-center h-10 w-8 text-gray-400">
              <PaperClipIcon className="w-5 h-5" />
            </button>
            <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
              <PhotoIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div onClick={() => sendMessage()} className="ml-6">
          <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200  dark:text-slate-300 dark:bg-slate-500  text-gray-500">
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
