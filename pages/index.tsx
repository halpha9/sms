import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { useSession } from '../providers/session';

import React, { useState } from 'react';
import FullScreenLoader from '../components/full-screen-loader';
import NewChatModal from 'components/chat/new-chat';
import ChatBox from 'components/chat/box';
import { API, withSSRContext } from 'aws-amplify';
import { listRooms } from 'queries/queries';

export interface HomeState {
  openSession: boolean;
  showModal: boolean;
  currentSession: string | null;
  to: any;
}

const Home = props => {
  const { user } = useSession();
  const { register } = useForm({ mode: 'all', reValidateMode: 'onChange' });

  console.log(user);

  const getRooms = async () => {
    const result = await API.graphql({
      query: listRooms
    });

    console.log(result);
  };
  console.log(getRooms());
  const [state, setState] = useState<HomeState>({
    openSession: false,
    currentSession: null,
    showModal: false,
    to: null
  });

  const { data, isLoading } = { data: null, isLoading: false };

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
                  data.chat_session &&
                  data.chat_session.length > 0 &&
                  data.chat_session.map((session, index) => {
                    return (
                      <>
                        {/* {member && member.length > 0 && (
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
                        )} */}
                      </>
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
      )}
    </>
  );
};

export default Home;

export const getServerSideProps = async ({ context }) => {
  // 👇 pass the context to an Amplify function
  const { API, Auth } = withSSRContext(context);
  try {
    const user = await Auth.currentAuthenticatedUser();
    const { data } = await API.graphql({
      query: listRooms
    });

    const currentRoomData = data.listRooms.items.find(room => room.id === context.params.roomId);
    return {
      props: {
        currentRoomData,
        username: user.username,
        // roomsList: data.listRooms.items,
        item: 'dmsmpw'
      }
    };
    // 👇 if there's an error, perform a server-side redirect
  } catch (err) {
    console.log(err);
    return {
      // redirect: {
      //   destination: '/',
      //   permanent: false
      // }
      props: {
        authenticated: false
      }
    };
  }
};
