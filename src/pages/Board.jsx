import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

function Board({ user, setUser }) {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Learn React", status: "todo" },
    { id: "2", title: "Make Kanban UI", status: "inprogress" },
  ]);

  const [errorMsg, setErrorMsg] = useState("");

  const simulateServerCall = () => {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 1000 + 1000;

      setTimeout(() => {
        if (Math.random() < 0.2) {
          reject("Error");
        } else {
          resolve("Success");
        }
      }, delay);
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const addTask = async () => {
    const text = prompt("Enter task name");
    if (!text) return;

    const newTask = {
      id: Date.now().toString(),
      title: text,
      status: "todo",
    };

    const oldTasks = [...tasks];
    setTasks([...tasks, newTask]);

    try {
      await simulateServerCall();
    } catch (err) {
      setTasks(oldTasks);
      setErrorMsg("Could not update task. Please try again.");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  const deleteTask = async (id) => {
    const oldTasks = [...tasks];
    const filtered = tasks.filter((item) => item.id !== id);
    setTasks(filtered);

    try {
      await simulateServerCall();
    } catch (err) {
      setTasks(oldTasks);
      setErrorMsg("Unable to delete task.");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;

    const oldTasks = [...tasks];

    const updated = tasks.map((task) =>
      task.id === draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );

    setTasks(updated);

    try {
      await simulateServerCall();
    } catch (err) {
      setTasks(oldTasks);
      setErrorMsg("Task could not be added.");
      setTimeout(() => setErrorMsg(""), 2000);
    }
  };

  const columns = {
    todo: "To Do",
    inprogress: "In Progress",
    done: "Done",
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user}</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {errorMsg && (
        <div className="fixed top-5 right-5 bg-red-500 px-4 py-2 rounded shadow">
          {errorMsg}
        </div>
      )}

      <button
        onClick={addTask}
        className="mb-6 bg-blue-500 px-4 py-2 rounded"
      >
        + Add Task
      </button>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {Object.entries(columns).map(([key, title]) => (
            <Droppable droppableId={key} key={key}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-700 p-4 rounded-lg w-1/3 min-h-[400px]"
                >
                  <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                    {title}
                  </h2>

                  {tasks
                    .filter((task) => task.status === key)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                           className="bg-white text-black p-3 rounded mb-3 shadow cursor-grab active:cursor-grabbing"


                          >
                            <p className="font-medium mb-2">
                              {task.title}
                            </p>
                            <button
                              onClick={() => deleteTask(task.id)}
                              className="bg-red-100 px-2 py-1 rounded text-xs"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Board;
