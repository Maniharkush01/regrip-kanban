import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Board from "./pages/Board";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  return (
    <>
      {user ? <Board user={user} setUser={setUser} /> : <Login setUser={setUser} />}
    </>
  );
}

export default App;
