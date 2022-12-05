import React, { useState } from 'react';
import ChatBox from 'components/chat/box';
import { withSSRContext } from 'aws-amplify';
import { listRooms } from 'queries/queries';
import { motion } from 'framer-motion';
import { useApp } from 'providers/chat';

export interface HomeState {
  showModal: boolean;
  to: any;
}

const Home = ({ roomsList }) => {
  const { chatSession, state: appState, setState: setAppState } = useApp();

  // const { register } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  const [state, setState] = useState<HomeState>({
    showModal: false,
    to: null
  });

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
    <>
      {/* {roomsList ? (
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
                      {...register('search')}
                    />
                    <MagnifyingGlassIcon className="text-slate-400 w-7 h-7" />
                  </div>
                </div>
              </div>
              <div className="flex-col divide-y divide-slate-700">
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
                        className="h-24 bg-slate-800 flex items-center px-8"
                      >
                        <div className="px-5 flex items-center justify-between w-full">
                          <p className="text-slate-400 text-lg font-medium truncate">{session.name}</p>
                          <div className="flex-col space-y-2">
                            <UserIcon className="text-slate-400 w-6 h-6" />
                            <p className=" text-center text-slate-400 text-xs font-medium">2</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
            <div className="w-8/12 bg-slate-900 border border-blue-100 rounded-md h-full overflow-auto">
              <ChatBox state={state} setState={setState} />
            </div>
          </div>
          {state.showModal && <NewChatModal state={state} setState={setState} />}
        </div>
      ) : (
        <FullScreenLoader />
      )} */}
      <div className="flex flex-row h-screen antialiased text-gray-800">
        <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
          <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
            <div className="flex flex-row items-center">
              <div className="flex flex-row items-center">
                <div className="text-xl font-semibold">Messages</div>
                <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
                  5
                </div>
              </div>
              <div className="ml-auto">
                <button className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full">
                  <svg
                    className="w-4 h-4 stroke-current"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-5">
              <ul className="flex flex-row items-center justify-between">
                <li>
                  <a href="#" className="flex items-center pb-3 text-xs font-semibold relative text-indigo-800">
                    <span>All Conversations</span>
                    <span className="absolute left-0 bottom-0 h-1 w-6 bg-indigo-800 rounded-full"></span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center pb-3 text-xs text-gray-700 font-semibold">
                    <span>Archived</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center pb-3 text-xs text-gray-700 font-semibold">
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
                <div className="flex-col divide-y divide-gray-200">
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
                          className="relative flex flex-row items-center p-4"
                        >
                          <div className="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">5 min</div>
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
                            {session.name[0]}
                          </div>
                          <div className="flex flex-col flex-grow ml-3">
                            <div className="text-sm font-medium">{session.name}</div>
                            {/* <div className="text-xs truncate w-40">
                              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?
                            </div> */}
                          </div>
                          <div className="flex-shrink-0 ml-2 self-end mb-1">
                            <span className="flex items-center justify-center h-5 w-5 bg-red-500 text-white text-xs rounded-full">
                              5
                            </span>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ChatBox state={state} setState={setState} />
      </div>
    </>
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
