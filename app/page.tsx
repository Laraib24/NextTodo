import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import { TodoList } from "./components/TodoList";

export default async function Home() {
  const tasks = await getAllTodos();
  console.log(tasks);
  return (
    <main className="mx-auto max-w-4xl mt-4">
      <div className="text-center mx-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo List App</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
