import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { useApp } from 'providers/chat';
import React, { useEffect, useRef } from 'react';
import { scrollToBottom } from 'utils/page';
import { motion } from 'framer-motion';
import { API, graphqlOperation } from 'aws-amplify';
import { onCreateRoom } from 'queries/subscriptions';
import { OnCreateRoomSubscription } from 'queries';
import { GraphQLSubscription } from '@aws-amplify/api';

function ChatNav({ setState, state, roomsList }) {
  const { chatSession, state: appState, setState: setAppState } = useApp();

  const moveToRoom = (room: string) => {
    try {
      if (chatSession !== room) {
        setAppState({ ...appState, chatSession: room });
      } else {
        setAppState({ ...appState, chatSession: '' });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function subscribe() {
      const subscription = (
        await API.graphql<GraphQLSubscription<OnCreateRoomSubscription>>(graphqlOperation(onCreateRoom))
      ).subscribe({
        next: ({ value }) => {
          setState(s => ({ ...s, roomsList: [...s.roomsList, value.data.onCreateRoom] }));
        }
      });
      scrollToBottom(messagesEndRef);
      subscription.unsubscribe();
    }

    if (roomsList) {
      subscribe();
    }
  }, [roomsList]);

  return (
    <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 dark:bg-slate-800 p-4">
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="text-xl font-semibold text-black dark:text-slate-300">Messages</div>
            <div className="flex items-center justify-center ml-2 text-xs h-6 w-6 text-white bg-red-500 rounded-full font-medium">
              <p className="font-semibold">{roomsList && roomsList.length > 0 ? roomsList.length : 0}</p>
            </div>
          </div>
          <div className="ml-auto">
            <button
              onClick={() => setState(s => ({ ...s, showModal: true }))}
              className="flex items-center justify-center h-7 w-7 bg-gray-200 dark:bg-transparent text-gray-500 rounded-full"
            >
              <PlusCircleIcon className="w-8 h-8 dark:text-slate-300" />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-row items-center justify-center">
            <div className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800 dark:text-slate-300">
              <span>All Groups</span>
              <span className="dark:bg-slate-300 absolute left-0 bottom-0 h-1 w-full bg-indigo-800 rounded-full"></span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="text-xs text-gray-400 font-semibold uppercase">Team</div>
        </div>
        <div className="mt-2">
          <div className="flex flex-col -mx-4">
            <div className="flex-col divide-y divide-gray-200 dark:divide-slate-500">
              {roomsList &&
                roomsList.length > 0 &&
                roomsList.map((session, index) => {
                  return (
                    <motion.div
                      key={index}
                      onClick={() => {
                        moveToRoom(session.id);
                      }}
                      whileHover={{
                        opacity: 0.8
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="relative flex flex-row items-center p-4 py-6"
                    >
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                        {session.name[0].toUpperCase()}
                      </div>
                      <div className="flex flex-col flex-grow ml-3">
                        <div className="text-sm font-medium dark:text-slate-300">{session.name}</div>
                      </div>
                    </motion.div>
                  );
                })}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatNav;
