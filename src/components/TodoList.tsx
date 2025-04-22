
import React from "react";
import TodoItem from "./TodoItem";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
};

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
}

class TodoList extends React.Component<TodoListProps> {
  render() {
    const { todos, onToggle } = this.props;
    return (
      <div className="flex flex-col mt-6">
        {todos.length === 0 ? (
          <div className="text-gray-400 py-8 text-center">No todos yet. Add one above!</div>
        ) : (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
          ))
        )}
      </div>
    );
  }
}

export default TodoList;
