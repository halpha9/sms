import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { Dispatch, SetStateAction } from 'react';
import { createRoom } from 'queries/mutations';
import { API } from 'aws-amplify';
import { HomeState } from 'pages/dashboard';

const NewChatModal = ({ state, setState }: { state: HomeState; setState: Dispatch<SetStateAction<HomeState>> }) => {
  const [chatName, setChatName] = React.useState('');

  const createChatSession = async () => {
    try {
      await API.graphql({
        query: createRoom,
        variables: { input: { name: chatName } }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const openSession = async () => {
    await createChatSession();
    setState(s => ({ ...s, showModal: false }));
  };

  return (
    <div className="">
      {state.showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-100 dark:bg-slate-800 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t ">
                  <h3 className="text-1xl font=semibold dark:text-slate-300">Type A Chat Name</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setState({ ...state, showModal: false })}
                  >
                    <div className="p-0.5 rounded-full bg-gray-300 dark:bg-slate-400">
                      <XMarkIcon className="h-6 w-6 text-gray-100 dark:text-slate-600" strokeWidth={2.3} />
                    </div>
                  </button>
                </div>
                <div className="relative p-6 flex-auto w-full">
                  <input
                    className="dark:bg-slate-700 p-2 rounded-md dark:text-slate-400 text-sm px-4 w-full"
                    onChange={e => setChatName(e.target.value)}
                    placeholder="Chat Name"
                  />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid rounded-b space-x-3">
                  <button
                    className="text-red-500 bg-gray-50 dark:bg-slate-600 font-semibold tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setState({ ...state, showModal: false })}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-gray-300 dark:bg-slate-500 font-semibold tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => openSession()}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default NewChatModal;
