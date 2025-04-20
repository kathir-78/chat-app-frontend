import React, { useEffect, useState } from 'react'
import createWebSocketConnection from '../utils/webSocket';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Chats = () => {

  const params = useParams();
  const toUserId = params.toUser;

  const user = useSelector( state => state.user);
  const fromUserId = user?._id;
  const firstName = user?.firstName;

  const [newMessage, setNewMessage] = useState('');
  const [message, setMessage] = useState([]);

  const sendMessage = ()=> {

    if (!newMessage.trim()) return;

    const socket = createWebSocketConnection();

    socket.emit("sendMessage", ({firstName, fromUserId, toUserId, newMessage}) )
    setNewMessage('');

  }

  useEffect(()=> {

    if (!fromUserId ) return;

    // when the component load make the websocket connection
    const socket = createWebSocketConnection();

    //emit the joinChat event with the from and to user_id to generate the roomid and make them join   
    socket.emit('joinChat',{fromUserId, toUserId} );

    //listen for the messageWanted
    socket.on("receiveMessage", ({firstName, newMessage}) => {
      console.log("messagereceived");
      setMessage((prevMessages) => [...prevMessages, {firstName, newMessage}]);
    })

    return () => {
      socket.disconnect();
    };

  }, [fromUserId, toUserId])

  return (
  <section className="flex justify-center bg-[#002b36] text-white" style={{ height: 'calc(100vh - 64px)' }}>
    <div className="w-1/2 p-6 rounded-lg shadow-2xl flex flex-col my-10">
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {message.map((mes, index) => (
          <div key={index} className="chat chat-start">
          <div className="chat-header">
            { mes.firstName }
          </div>
          <div className="chat-bubble">{mes.newMessage}</div>
        </div>
        ))}
      </div>
      <div className='flex gap-2'>
        <input type="text"
          className="input input-neutral flex-1"
          value={newMessage}
          onChange={(e)=> setNewMessage(e.target.value)} />
        <button className="btn btn-success" onClick={sendMessage}>Send</button>
      </div>
    </div>
  </section>
  );
};
