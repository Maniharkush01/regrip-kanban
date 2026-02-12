import { TaskProvider } from "./context/TaskContext";
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
    <TaskProvider>
      {user ? (
        <Board user={user} setUser={setUser} />
      ) : (
        <Login setUser={setUser} />
      )}
    </TaskProvider>
  );
}

export default App;
