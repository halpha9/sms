import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { Dispatch, SetStateAction } from 'react';
import { HomeState } from 'pages';
import ChatModal from './chat';

const NewChatModal = ({ state, setState }: { state: HomeState; setState: Dispatch<SetStateAction<HomeState>> }) => {
  const data = null;
  const isLoading = false;

  const createChatSession = async () => {
    try {
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
      <button
        className="bg-blue-200 text-black active:bg-blue-500 
        font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        type="button"
        onClick={() => setState({ ...state, showModal: false })}
      >
        Fill Details
      </button>
      {state.showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-slate-800 outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-600 rounded-t ">
                  <h3 className="text-1xl font=semibold text-slate-300">Select A User</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setState({ ...state, showModal: false })}
                  >
                    <div className="p-0.5 rounded-full bg-slate-400">
                      <XMarkIcon className="h-6 w-6 text-slate-600" strokeWidth={2.3} />
                    </div>
                  </button>
                </div>
                {!isLoading && data && data.user && (
                  <div className="relative p-6 flex-auto">
                    <ChatModal setState={setState} data={data && data.user} state={state} />
                  </div>
                )}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-600 rounded-b">
                  <button
                    className="text-red-500 background-transparent tracking-wider font-semibold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setState({ ...state, showModal: false })}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-slate-500 active:bg-slate-700 font-semibold tracking-wider uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={async () => await openSession()}
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
