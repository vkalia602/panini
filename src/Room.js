import React, { useContext, useState, useEffect } from "react";
import { RoomContext } from "./context/RoomContext";
import Button from "./components/button";
const { io } = require("socket.io-client");

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:8080"
    : window.location.host;
const COLOURLIST = ["purple", "yellow", "blue", "red", "orange", "green"]
const Chatting = ({
  message,
  setMessage,
  messageList,
  setMessageList,
  socket,
}) => {
  const [username, setUsername] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("username");
    return saved || "";
  });
  const {socketId} = useContext(RoomContext)
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log('recieve message', data);
      setMessageList((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          createdAt: data.createdAt
        },
      ]);
    });
  }, [socket, setMessageList])

  const handleSubmit = (e)=>{
    e.preventDefault()
    setMessage(e.target.value)
    const newMessage = {
      message,
      name: '1234',
      createdAt: new Date(),
    }
    setTimeout(() => {
      socket.emit('message', {
        message: newMessage,
        socketId: socketId,
      });
    }, 1000);
    setMessageList([...messageList, message])
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };
  return(
    <>
    <div className="grid grid-cols-1 gap-y-4">
      {messageList.map((item)=><div key={Math.random()}className={`border-2 rounded-md border-black p-4 bg-${COLOURLIST[0]}-500`}>
        <div>{username}</div>
        {item}
        </div>)}
    </div>
    <input className="w-full p-2 border-blue-400 border-2 rounded-lg my-2" value={message} onChange={(e)=> setMessage(e.target.value)} onKeyDown={handleKeyDown} />
    <div className="mx-5"><Button title={'Enter'} className="mx-5" onClick={handleSubmit} /></div>
    </>
  );
};

export default function Room() {
  const {socketId} = useContext(RoomContext)
  const [isOpen, setIsOpen] = useState(false);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(()=>{
    setIsOpen(true);
    setRoom("League of Legends");
    const sk = io(ENDPOINT);
    setSocket(sk);
  }, [])

  const exitRoomHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="grid grid-cols-5 grid-flow-col-dense w-full h-full">
      <div className="col-span-2 justify-items-center text-center">
        Connected Users
      </div>
      <div className="col-span-3 w-full p-5 h-1/2 mx-auto">
        {isOpen ? (
          <Chatting
            message={message}
            setMessage={setMessage}
            messageList={messageList}
            setMessageList={setMessageList}
            socket={socket}
            socketId={socketId}
          />
        ) : (
          <p>Room Unavailable</p>
        )}
      </div>
    </div>
  );
}
