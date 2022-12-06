import React, { useEffect, useRef, useState } from 'react';
import ChatBox from 'components/chat/box';
import { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listRooms } from 'queries/queries';
import { motion } from 'framer-motion';
import { useApp } from 'providers/chat';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import NewChatModal from 'components/chat/new-chat';
import { scrollToBottom } from 'utils/page';
import { onCreateRoom } from 'queries/subscriptions';

export interface HomeState {
  showModal: boolean;
  to: any;
  roomsList: any;
}

const Home = ({ roomsList }) => {
  const { chatSession, state: appState, setState: setAppState } = useApp();

  const [state, setState] = useState<HomeState>({
    showModal: false,
    to: null,
    roomsList
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    async function subscribe() {
      //@ts-ignore
      (await API.graphql(graphqlOperation(onCreateRoom))).subscribe({
        next: ({ value }) => {
          setState(s => ({ ...s, roomsList: [...state.roomsList, value.data.onCreateRoom] }));
        }
      });
      scrollToBottom(messagesEndRef);
    }

    if (roomsList) {
      subscribe();
    }
  }, [state.roomsList]);

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

  return (
    <div className="flex flex-row h-screen antialiased text-gray-800">
      <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 dark:bg-slate-800 p-4">
        <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
          <div className="flex flex-row items-center">
            <div className="flex flex-row items-center">
              <div className="text-xl font-semibold text-black dark:text-slate-300">Messages</div>
              <div className="flex items-center justify-center ml-2 text-xs h-6 w-6 text-white bg-red-500 rounded-full font-medium">
                <span> 5</span>
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
            <ul className="flex flex-row items-center justify-between">
              <li>
                <a
                  href="#"
                  className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800 dark:text-slate-300"
                >
                  <span>All Conversations</span>
                  <span className="dark:bg-slate-300 absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full"></span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center pb-3 text-xs text-gray-700 dark:text-slate-500 font-semibold">
                  <span>Archived</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center pb-3 text-xs text-gray-700 dark:text-slate-500 font-semibold">
                  <span>Starred</span>
                </a>
              </li>
            </ul>
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
                        <div className="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3 dark:text-slate-400">
                          5 min
                        </div>
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                          {session.name[0]}
                        </div>
                        <div className="flex flex-col flex-grow ml-3">
                          <div className="text-sm font-medium dark:text-slate-300">{session.name}</div>
                        </div>
                        <div className="flex-shrink-0 ml-2 self-end mb-1">
                          <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                            5
                          </span>
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
      <ChatBox />
      {state.showModal && <NewChatModal state={state} setState={setState} />}
    </div>
  );
};

export default Home;

export const getServerSideProps = async ({ req }) => {
  const { API } = withSSRContext({ req });
  try {
    const { data } = await API.graphql({
      query: listRooms,
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });

    return {
      props: {
        roomsList: data.listRooms.items
      }
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: '/',
        permanent: false
      },
      props: {
        authenticated: false
      }
    };
  }
};
