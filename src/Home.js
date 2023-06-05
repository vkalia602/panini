import { useState } from "react";
import Button from "./components/button";
import Card from "./components/Card";

const rooms = [
  {
    name: "League of Legends",
    description: "New game for cool people",
    logo: "league-of-legends.jpg",
    socketId: 'hdhdh888',
  },
  {
    name: "Wall Street Bets",
    description: "Stock investing for cool people",
    logo: "wall-street-bets.jpeg",
    socketId: '9999',
  },
  {
    name: "Theorize This!",
    description: "Forum to discuss conspiracy theories",
    logo: "birds-arent-real.jpeg",
    socketId: '1010101',
  },
];

const UsernameInput = ({ Username, setUsername }) => {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        className=""
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          setUsername(value);
          localStorage.setItem("username", value);
        }}
      />
    </>
  );
};
const Home = ({ socket }) => {
  const displayCards = () => {
    console.log("displaying cards");
    const cards = rooms.map((room) => (
      <div key={room.name}>
        <Card
          name={room.name}
          description={room.description}
          logo={room.logo}
          sockId={room.socketId}
        />
      </div>
    ));
    return cards;
  };
  const [username, setUsername] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("username");
    return saved || "";
  });

  return (
    <div>
      <h1>Welcome to Panini</h1>
      <h3>Connecting cool people since 1700's</h3>
      {username.length > 0 ? (
        <div className="grid grid-cols-3 gap-x-3 m-5 h-full">
          {displayCards()}{" "}
        </div>
      ) : (
        <UsernameInput Username={username} setUsername={setUsername} />
      )}
    </div>
  );
};
export default Home;
