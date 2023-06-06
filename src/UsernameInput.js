import React, { useState, useContext } from "react";
import {UserContext} from "./context/UserContext"
import Button from "./components/button";
const UsernameInput = () => {
    const {setUsername} = useContext(UserContext)
    const [value, setValue] = useState("");
    const [isUser, setUser] = useState(false)
    const handleClick = ()=>{
        setUsername(value)
        setUser(true)
    }
    return (
      <div>
      {isUser ? (
        <div>
            <input
                className=""
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}/>
            <Button
            onClick={handleClick}
            title={"Add Username"}
            />
        </div>
        ) :(
        <h4>Hello {value} </h4>
        )}
        
      </div>
    );
  };
  export default UsernameInput