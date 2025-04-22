
// Modern, playful todo app main component

import React, { useState } from "react";
import TodoList from "../components/TodoList";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
};

const Index: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) {
      toast({ title: "Please enter a todo item." });
      return;
    }
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: input.trim(),
        completed: false,
        createdAt: Date.now(),
      },
    ]);
    setInput("");
  };

  const handleToggle = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F1F0FB]">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-[#9b87f5]">Tick Tock Todo List</h1>
        <form onSubmit={handleAdd} className="flex gap-2 mb-2">
          <Input
            value={input}
            placeholder="What needs to be done?"
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
            aria-label="Add todo"
            maxLength={100}
          />
          <Button
            type="submit"
            className="bg-[#9b87f5] hover:bg-[#7E69AB] transition font-bold"
          >
            Add
          </Button>
        </form>
        <TodoList todos={todos} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default Index;
