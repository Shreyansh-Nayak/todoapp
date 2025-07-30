import React, { useState } from "react";
import VoiceInput from "./Voiceinput";


const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask("");
    }
  };

  const handleVoiceCommand = (text) => {
    setTask(text);
    setTimeout(addTodo, 500); // Optional auto-add
  };

  return (
    
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="border p-2 rounded w-full"
        />
        <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </div>
      <VoiceInput onCommand={handleVoiceCommand} />
      <ul className="mt-4">
        {todos.map((todo, i) => (
          <li key={i} className="border-b py-2">
            {todo}
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default Todo;
