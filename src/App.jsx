import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useAuth } from './Authcontext';
import Login from './Login'
import Todo from "./components/Todo";
import { Routes, Route } from 'react-router-dom';
import Home from './pae/Home';

function App() {
  const { user } = useAuth();
  const [todo, settodo] = useState(" ");
  const [todos, settodos] = useState([]);
  const [showfinished, setshowfinished] = useState(true);

  // Load user-specific todos on login
  useEffect(() => {
    if (!user) return;
    const todostring = localStorage.getItem(`todos-${user.uid}`);
    if (todostring) {
      settodos(JSON.parse(todostring));
    }
  }, [user]);

  // Auto-save todos on change
  useEffect(() => {
    if (!user) return;
    localStorage.setItem(`todos-${user.uid}`, JSON.stringify(todos));
  }, [todos, user]);

  const handleadd = () => {
    if (!user || todo.trim().length <= 3) return;
    settodos([...todos, { id: uuidv4(), todo: todo.trim(), isCompleted: false }]);
    settodo("");
  };

  const handleedit = (e, id) => {
    const t = todos.find(item => item.id === id);
    if (t) settodo(t.todo);
    settodos(todos.filter(item => item.id !== id));
  };

  const handledelete = (e, id) => {
    settodos(todos.filter(item => item.id !== id));
  };

  const handlechange = (e) => {
    settodo(e.target.value);
  };

  const handlecheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    settodos(newTodos);
  };

  const togglefinished = () => {
    setshowfinished(prev => !prev);
  };
if (!user) {
    return (
      <div className="text-white p-10 bg-violet-700 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to iTask</h1>
        <p className="mb-4">Please log in to manage your tasks</p>
        <Login />
      </div>
    );
  }
  
  

  return (
    <>
      <Navbar />
       <Routes> 
        <Route path="/" element={<Home />} />

        <Route path="/todo" element={<Todo />} />
        
        <Route path="/login" element={<Login />} />
      </Routes>
      <div className="mx:3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-600 text-white min-h-[80vh] md:width-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>

        <div className="addtodo flex flex-col my-5 gap-4">
          <h2 className='text-lg font-bold'>ADD YOUR TODOS</h2>
          <div className="flex gap-2">
            <input
              onChange={handlechange}
              value={todo}
              type="text"
              className='bg-slate-300 rounded-full w-full px-5 py-1 text-black'
              placeholder='Write something...'
            />
            <button
              onClick={handleadd}
              disabled={todo.trim().length <= 3}
              className='bg-violet-500 text-white hover:bg-violet-400 p-4 py-2 disabled:bg-violet-800 rounded-full font-bold text-sm'
            >
              SAVE
            </button>
          </div>
        </div>

        <input
          className='my-4'
          id='show'
          onChange={togglefinished}
          type="checkbox"
          checked={showfinished}
        />
        <label className='mx-2' htmlFor="show">Show Finished</label>

        <div className='h-[1px] bg-purple-500 w-[90%] mx-auto my-2'></div>
        <h2 className='text-xl font-bold'>Your Todos</h2>

        <div className="todos flex flex-col">
          {todos.length === 0 && <div className='m-5'>NO TODOS TO DISPLAY</div>}
          {todos.map(item => (
            (showfinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex my-3 justify-between items-center">
                <div className='flex gap-5 items-center'>
                  <input
                    onChange={handlecheckbox}
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex">
                  <button
                    onClick={(e) => handleedit(e, item.id)}
                    className='bg-violet-500 text-white hover:bg-violet-400 p-3 py-1 rounded-md mx-1 font-bold text-sm'
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={(e) => handledelete(e, item.id)}
                    className='bg-violet-500 text-white hover:bg-violet-400 p-3 py-1 rounded-md mx-1 font-bold text-sm'
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}


export default App;
