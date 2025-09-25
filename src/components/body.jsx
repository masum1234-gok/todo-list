import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'react-todos';

function Body() {
  const inputRef = useRef(null);
  const [showfinished, setshowfinished] = useState()
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(() => {
    // Initialize state with localStorage data
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  });
  const togolefnished= (params) => {
    setshowfinished(!showfinished)
  }
  
  const [editId, setEditId] = useState(null);

  // Save todos whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  }, [todos]);

  const handleAdd = () => {
    if (!todo.trim()) return;

    if (editId) {
      setTodos(todos.map(item =>
        item.id === editId ? { ...item, todo, isCompleted: item.isCompleted } : item
      ));
      setEditId(null);
    } else {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    }
    setTodo('');
    inputRef.current?.focus();
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find(item => item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo);
      setEditId(id);
      inputRef.current?.focus();
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const handleToggle = (id) => {
    setTodos(todos.map(item =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center py-10 font-sans bg-[#e0e5ec] max-w-[500px] mx-auto mt-[51px] rounded-[20px] shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff]">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📝 My Todo List</h1>

      <div className="flex space-x-2 mb-6 w-full max-w-md">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a task"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 focus:outline-none font-sans bg-[#e0e5ec] rounded-[20px] shadow-[inset_6px_6px_8px_#a3b1c6,inset_-5px_-5px_20px_#ffffff]"
        />
        <button
          onClick={handleAdd}
          className=" px-4 py-2 font-bold bg-[#e0e5ec] rounded-[15px] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] hover:shadow-[3px_3px_7px_#a3b1c6,-3px_-3px_7px_#ffffff] active:shadow-inset transition-all"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>
      <div className='flex gap-4'><input 
       type="checkbox"
       onChange={togolefnished}
       className='px-3 py-1 font-bold bg-[#e0e5ec] rounded-[15px] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] hover:shadow-[3px_3px_7px_#a3b1c6,-3px_-3px_7px_#ffffff] active:shadow-inset transition-all appearance-none w-5 h-5 bg-white rounded-[7px] checked:bg-violet-800 checked:border-none outline-none cursor-pointer shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff]'
       checked={showfinished}
        /><span>show how finished</span> </div>
        
      <ul className="w-full max-w-md space-y-3 border-t border-gray-300 pt-5">
        {todos.length === 0 ? (
          <div className="text-center py-4 text-gray-500">No todos yet. Add one above!</div>
        ) : (
          todos.map((item) =>(showfinished || !item.isCompleted ) && (
            <li key={item.id} className="flex items-center justify-between font-sans bg-[#e0e5ec] rounded-[20px] shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff] p-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleToggle(item.id)}
                  className="  appearance-none w-5 h-5 bg-white rounded-[7px] checked:bg-violet-800 checked:border-none outline-none cursor-pointer"
                />
                <div className={item.isCompleted ? "line-through text-gray-500" : "text-gray-700"}>
                  {item.todo}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(item.id)}
                  className="px-3 py-1 font-bold bg-[#e0e5ec] rounded-[15px] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] hover:shadow-[3px_3px_7px_#a3b1c6,-3px_-3px_7px_#ffffff] active:shadow-inset transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-3 py-1 font-bold bg-[#e0e5ec] rounded-[15px] shadow-[5px_5px_10px_#a3b1c6,-5px_-5px_10px_#ffffff] hover:shadow-[3px_3px_7px_#a3b1c6,-3px_-3px_7px_#ffffff] active:shadow-inset transition-all"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Body;