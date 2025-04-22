
import React, { useEffect, useState } from "react";
import { Check, Square } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number; // Unix timestamp (ms)
};

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
}

const getElapsedString = (createdAt: number, now: number) => {
  const diff = Math.floor((now - createdAt) / 1000);
  if (diff < 1) return "just now";
  if (diff === 1) return "1 second ago";
  return `${diff} seconds ago`;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`flex items-center justify-between bg-white rounded-lg shadow-sm px-4 py-3 mb-3 transition ${
        todo.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <button
          className={`w-6 h-6 flex items-center justify-center rounded border-2 ${
            todo.completed
              ? "bg-[#9b87f5] border-[#9b87f5]"
              : "border-gray-300 hover:border-[#9b87f5]"
          } transition`}
          aria-checked={todo.completed}
          onClick={() => onToggle(todo.id)}
        >
          {todo.completed ? (
            <Check className="text-white w-4 h-4" />
          ) : (
            <Square className="text-gray-300 w-4 h-4" />
          )}
        </button>
        <span
          className={`text-lg ${
            todo.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <span className="text-xs text-[#9b87f5] font-medium select-none">
        {getElapsedString(todo.createdAt, now)}
      </span>
    </div>
  );
};

export default TodoItem;
