import { EllipsisHorizontalIcon, FaceSmileIcon, PaperClipIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useSession } from '../../providers/session';
import { motion } from 'framer-motion';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { HomeState } from 'pages';

export default function ChatBox({
  state,
  setState
}: {
  state: HomeState;
  setState: Dispatch<SetStateAction<HomeState>>;
}) {
  type StateProps = string;
  const { claims } = useSession();

  const data = null;
  const [message, setMessage] = useState<StateProps>('');
  const recipient =
    data && data.chatSession?.members.filter(member => member.user_id !== claims['x-hasura-user-id'])[0];

  const currentUser =
    data && data.chatSession?.members.filter(member => member.user_id === claims['x-hasura-user-id'])[0];

  const sendMessage = async () => {
    try {
      setMessage('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-scree overflow-hidden">
      <div className="relative border-b p-8 flex w-full items-center justify-between h-24 bg-slate-900 mb-10">
        <div className="flex items-center">
          <p className="text-4xl font-semibold text-slate-400">
            {/* {member[0].user?.first_name} {member[0].user?.last_name} */}
          </p>
          <p className="hidden lg:inline text-md font-light text-slate-400 px-10">
            {/* <p className="text-gray-400">{user.attributes.email}</p> */}
          </p>
        </div>
        <div className="flex space-x-4 cursor-pointer">
          <EllipsisHorizontalIcon className="w-7 h-7 text-slate-400" />
          <div onClick={() => setState({ ...state, showModal: !state.showModal })} className="">
            <PlusCircleIcon className="w-7 h-7 text-slate-400" />
          </div>
        </div>
      </div>
      <div>
        {state.openSession && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="sm:items-center justify-between   border-gray-200 overflow-scroll"
          >
            {state.currentSession && (
              <div className="flex flex-col flex-auto h-full p-6 scroll-m-0">
                <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl relative h-full p-4">
                  <div className="flex flex-col  overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                      <div className="grid grid-cols-12 gap-y-2">
                        <ul>
                          {data &&
                            data.chatSession?.messages?.map((message, index) => {
                              if (message.to_id === claims['x-hasura-user-id']) {
                                return (
                                  <motion.li
                                    key={index}
                                    initial={{
                                      opacity: 0,
                                      y: 50,
                                      scale: 0.3
                                    }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{
                                      opacity: 0,
                                      scale: 0.5,
                                      transition: { duration: 0.2 }
                                    }}
                                    className="col-start-1 col-end-8 p-3 rounded-lg"
                                  >
                                    <div className="flex flex-row items-center">
                                      <div className="flex items-center justify-center h-10 w-10 shadow rounded-full bg-orange-400 flex-shrink-0">
                                        {recipient && recipient.user && recipient.user.first_name[0]}
                                      </div>
                                      <div className="relative ml-3 text-sm bg-slate-200 py-2 px-4 shadow rounded-xl">
                                        <div>{message.text}</div>
                                      </div>
                                    </div>
                                  </motion.li>
                                );
                              }
                              {
                                /* Outgoing message */
                              }
                              if (message.from_id === claims['x-hasura-user-id']) {
                                return (
                                  <motion.li
                                    key={index}
                                    initial={{
                                      opacity: 0,
                                      y: 50,
                                      scale: 0.3
                                    }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{
                                      opacity: 0,
                                      scale: 0.5,
                                      transition: { duration: 0.2 }
                                    }}
                                    className="col-start-6 col-end-13 p-3 rounded-lg"
                                  >
                                    <div className="flex items-center justify-start flex-row-reverse">
                                      <div className="flex items-center justify-center h-10 w-10 shadow rounded-full bg-indigo-500 flex-shrink-0">
                                        {currentUser && currentUser.user && currentUser.user.first_name[0]}
                                      </div>
                                      <div className="relative mr-3 text-sm bg-slate-300 py-2 px-4 shadow rounded-xl">
                                        <div>{message.text}</div>
                                      </div>
                                    </div>
                                  </motion.li>
                                );
                              }
                            })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 items-center">
              <div className="flex flex-row items-center h-16 rounded-xl border border-slate-600 bg-slate-800 w-full px-4  bottom-0 left-0">
                <div>
                  <button className="flex items-center justify-center text-slate-300 hover:text-slate-700">
                    <PaperClipIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex-grow ml-4">
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') sendMessage();
                      }}
                      className="flex w-full border rounded-xl focus:outline-none focus:border-slate-300 bg-slate-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-slate-600 hover:text-slate-700">
                      <FaceSmileIcon className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                <div className="ml-4">
                  <button
                    onClick={sendMessage}
                    className="flex items-center justify-center bg-slate-500 hover:bg-slate-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <PaperAirplaneIcon className="w-4 h-4 transform rotate-45 -mt-px" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
