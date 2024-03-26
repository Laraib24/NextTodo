import { ITask } from "@/types/tasks";
import React from "react";
import { Task } from "./Task";

interface TodoListProps {
  tasks: ITask[];
}
export const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto mt-2">
      <table className="table">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
