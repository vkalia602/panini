import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Home from './Home';
import Room from './Room';
import {RoomContext} from './context/RoomContext'
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:3000');
function App() {
  const [socketId, setSocketId] = useState()
  return (
    <RoomContext.Provider value={{socketId, setSocketId}}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Home socket={socket} />}></Route>
            <Route path="/chat" element={<Room socket={socket} />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </RoomContext.Provider>

  );
}

export default App;