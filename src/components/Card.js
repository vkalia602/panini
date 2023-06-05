import {
    Link,
  } from "react-router-dom";
import React, { useContext } from 'react'
import { RoomContext }from '../context/RoomContext'
import Button from './button'

export default function Card ({name, description, logo, socketId}) {
    const {setSocketId} = useContext(RoomContext)
    return (
        <div className="max-w-sm h-full rounded overflow-hidden shadow-lg" >
            <img className="w-full" src={logo} alt={name}/>
            <div className="px-6 py-4 flex flex-col text-center justify-center">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base">{description}</p>
                <div className="my-3">
                    <Link to="chat"><Button onClick={()=>setSocketId(socketId)} title={'Enter Room'}/></Link>
                </div>
            </div>
        </div>
    )
}

