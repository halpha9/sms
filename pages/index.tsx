import {
  EllipsisHorizontalIcon,
  FaceSmileIcon,
  MagnifyingGlassIcon,
  PaperClipIcon,
  PlusCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { useSession } from '../providers/session';
import { motion } from 'framer-motion';
import { Transition, Combobox } from '@headlessui/react';
import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon, PaperAirplaneIcon } from '@heroicons/react/20/solid';
import {
  useAddChatSessionMutation,
  useAddMessageMutation,
  useGetChatSessionQuery,
  useGetChatSessionsQuery,
  useGetUserQuery,
  User
} from '../queries';
import FullScreenLoader from '../components/full-screen-loader';

interface State {
  openSession: boolean;
  showModal: boolean;
  currentSession: string | null;
  to: any;
}

const Home = () => {
  const { client, claims } = useSession();
  const { register } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  const [state, setState] = useState<State>({
    openSession: false,
    currentSession: null,
    showModal: false,
    to: null
  });

  const { data, isLoading } = useGetChatSessionsQuery(client, {}, {});

  console.log(isLoading, 'xx23');

  return (
    <>
      {!isLoading ? (
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
                {data &&
                  claims &&
                  data.chat_session &&
                  data.chat_session.length > 0 &&
                  data.chat_session.map((session, index) => {
                    const member = session.members.filter(member => member.user_id !== claims['x-hasura-user-id']);
                    return (
                      <>
                        {member && member.length > 0 && (
                          <motion.div
                            key={index}
                            onClick={() => {
                              setState({
                                ...state,
                                currentSession: session.id,
                                openSession: !state.openSession
                              });
                            }}
                            whileHover={{
                              opacity: 0.8
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="h-24 bg-slate-800 flex items-center px-8"
                          >
                            <div className="w-14 h-14 rounded-lg bg-orange-400 shadow-sm hidden lg:flex  text-lg font-medium items-center justify-center">
                              {member[0].user?.first_name[0]}
                            </div>
                            <div className="px-5">
                              <p className="text-slate-400 text-lg font-medium truncate">
                                {member[0].user?.first_name} {member[0].user?.last_name}
                              </p>
                              <p className="text-slate-400 text-sm truncate">{member[0].user?.email}</p>
                            </div>
                          </motion.div>
                        )}
                      </>
                    );
                  })}
              </div>
            </div>
            <div className="w-8/12 bg-slate-900 border border-blue-100 rounded-md h-full overflow-auto">
              <ChatBox state={state} setState={setState} />
            </div>
          </div>
          {state.showModal && <Modal state={state} setState={setState} />}
        </div>
      ) : (
        <FullScreenLoader />
      )}
    </>
  );
};

export default Home;

function ChatBox({ state, setState }: { state: State; setState: Dispatch<SetStateAction<State>> }) {
  type StateProps = string;
  const { client, claims } = useSession();
  const addMessage = useAddMessageMutation(client);
  const { data } = useGetChatSessionQuery(client, { id: state.currentSession }, {});
  const [message, setMessage] = useState<StateProps>('');
  const recipient =
    data && data.chatSession?.members.filter(member => member.user_id !== claims['x-hasura-user-id'])[0];

  const currentUser =
    data && data.chatSession?.members.filter(member => member.user_id === claims['x-hasura-user-id'])[0];

  const sendMessage = async () => {
    console.log('sendinMessage xx23');

    const payload = {
      data: {
        group_id: state.currentSession,
        to_id: recipient?.user_id,
        from_id: currentUser?.user_id,
        text: message
      }
    };
    try {
      await addMessage.mutateAsync(payload);
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

function ChatModal({
  state,
  setState,
  data
}: {
  data: User[];
  setState: Dispatch<SetStateAction<State>>;
  state: State;
}) {
  const [selected, setSelected] = useState<User>(data && data[0]);
  const [query, setQuery] = useState('');

  const filteredPeople =
    query === ''
      ? data
      : data &&
        data.filter(
          person =>
            person &&
            person.email &&
            person.email.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  return (
    <div className=" top-16 w-full">
      <Combobox
        value={selected}
        onChange={event => {
          setSelected(event);
          setState({ ...state, to: event });
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-slate-600 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-slate-200 focus:ring-0 bg-slate-700"
              displayValue={(person: { first_name: string; last_name: string; email: string }) =>
                `${person.first_name} ${person.last_name} (${person.email})`
              }
              onChange={event => {
                setQuery(event.target.value);
              }}
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
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-600 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople && filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">Nothing found.</div>
              ) : (
                filteredPeople &&
                filteredPeople.map(person => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-slate-500 text-slate-300' : 'text-slate-400'
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {`${person.first_name} ${person.last_name} (${person.email})`}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-slate-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
  );
}

const Modal = ({ state, setState }: { state: State; setState: Dispatch<SetStateAction<State>> }) => {
  const { client } = useSession();
  const { data, isLoading } = useGetUserQuery(
    client,
    {},
    {
      enabled: state.showModal,
      onSuccess: (d: any) => {
        console.log('loaded users', d);
        setState(s => ({ ...s, loading: false }));
      }
    }
  );

  const createSession = useAddChatSessionMutation(client);
  const { claims } = useSession();
  const createChatSession = async () => {
    const payload = {
      data: {
        members: {
          data: [
            {
              user_id: claims['x-hasura-user-id']
            },
            {
              user_id: state.to.id
            }
          ]
        }
      }
    };
    try {
      createSession.mutateAsync(payload);
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
