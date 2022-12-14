import React, { useEffect, useRef, useState } from 'react';
import ChatBox from 'components/chat/box';
import { API, graphqlOperation, withSSRContext } from 'aws-amplify';
import { listRooms } from 'queries/queries';
import ChatNav from 'components/chat/nav';
import NewChatModal from 'components/chat/new-chat';
import { useSession } from 'providers/session';
import { useRouter } from 'next/router';
import { onCreateRoom } from 'queries/subscriptions';
import { scrollToBottom } from 'utils/page';
import { OnCreateRoomSubscription, Room } from 'queries';
import { GraphQLSubscription } from '@aws-amplify/api';

export interface HomeState {
  showModal: boolean;
  roomsList: Room[];
}

const DashBoard = ({ roomsList }) => {
  const [state, setState] = useState<HomeState>({
    showModal: false,
    roomsList
  });

  const roomsEndRef = useRef(null);

  const router = useRouter();
  const { user } = useSession();

  useEffect(() => {
    async function subscribe() {
      (await API.graphql<GraphQLSubscription<OnCreateRoomSubscription>>(graphqlOperation(onCreateRoom))).subscribe({
        next: ({ value }) => {
          setState(s => ({ ...s, roomsList: [...s.roomsList, value.data.onCreateRoom] }));
          scrollToBottom(roomsEndRef);
        }
      });
    }
    subscribe();
  }, []);

  if (!user) {
    return router.replace('/sign-in');
  }

  return (
    <div className="flex flex-row h-screen antialiased text-gray-800">
      <ChatNav setState={setState} roomsList={state.roomsList} />
      <ChatBox />
      {state.showModal && <NewChatModal state={state} setState={setState} />}
    </div>
  );
};

export default DashBoard;

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
