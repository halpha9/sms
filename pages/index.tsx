import React, { useState } from 'react';
import ChatBox from 'components/chat/box';
import { withSSRContext } from 'aws-amplify';
import { listRooms } from 'queries/queries';
import ChatNav from 'components/chat/nav';
import NewChatModal from 'components/chat/new-chat';

export interface HomeState {
  showModal: boolean;
  to: any;
  roomsList: any;
}

const Home = ({ roomsList }) => {
  const [state, setState] = useState<HomeState>({
    showModal: false,
    to: null,
    roomsList
  });

  return (
    <div className="flex flex-row h-screen antialiased text-gray-800">
      <ChatNav setState={setState} state={state} roomsList={roomsList} />
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
