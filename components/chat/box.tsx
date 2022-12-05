import {
  PaperAirplaneIcon,
  PaperClipIcon,
  PhotoIcon,
  MicrophoneIcon,
  EllipsisVerticalIcon
} from '@heroicons/react/24/outline';
import { useSession } from '../../providers/session';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { HomeState } from 'pages';
import { createMessage } from 'queries/mutations';
import { useApp } from 'providers/chat';
import { API } from 'aws-amplify';
import { listMessagesForRoom } from 'queries/queries';
import { graphqlOperation } from '@aws-amplify/api';
import { ListMessagesForRoomQuery } from 'queries';

export default function ChatBox({
  state,
  setState
}: {
  state: HomeState;
  setState: Dispatch<SetStateAction<HomeState>>;
}) {
  type StateProps = string;
  const { user } = useSession();
  const { chatSession } = useApp();
  const [message, setMessage] = useState<StateProps>('');
  const [messages, setMessages] = useState([]);

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
    async function getMessages() {
      try {
        const { data } = (await API.graphql(graphqlOperation(listMessagesForRoom, { roomId: chatSession }))) as {
          data: ListMessagesForRoomQuery;
          errors: any[];
        };
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
    <div className="flex flex-col h-full w-full bg-white px-4 py-6">
      <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">T</div>
        <div className="flex flex-col ml-3">
          <div className="font-semibold text-sm">UI Art Design</div>
          <div className="text-xs text-gray-500">Active</div>
        </div>
        <div className="ml-auto">
          <ul className="flex flex-row items-center space-x-2">
            <li>
              <a
                href="#"
                className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
              >
                <span>
                  <EllipsisVerticalIcon className="w-6 h-6" />
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="h-full overflow-hidden py-4">
        <div className="h-full overflow-y-auto">
          <div className="grid grid-cols-12 gap-y-2">
            {messages &&
              messages.length > 0 &&
              messages.map((message, index) => {
                if (user.username !== message.owner)
                  return (
                    <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                          A
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>{message.content.text}</div>
                        </div>
                      </div>
                    </div>
                  );
                return (
                  <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                    <div className="flex items-center justify-start flex-row-reverse">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                        A
                      </div>
                      <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                        <div>{message.content.text}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* <div className="col-start-1 col-end-8 p-3 rounded-lg">
              <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                  A
                </div>
                <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                  <div className="flex flex-row items-center">
                    <button className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-800 rounded-full h-8 w-10">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        ></path>
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                    <div className="flex flex-row items-center space-x-px ml-4">
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-12 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-6 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-5 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-3 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-10 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-1 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-8 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-2 w-1 bg-gray-500 rounded-lg"></div>
                      <div className="h-4 w-1 bg-gray-500 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
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
              className="bg-white dark:bg-white border border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
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
          <button className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 text-white">
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
