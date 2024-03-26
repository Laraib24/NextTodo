"use client";

import { ITask } from "@/types/tasks";
import { RiEditBoxLine } from "react-icons/ri";
import { FiTrash2 } from "react-icons/fi";
import { FormEventHandler, useState } from "react";
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

export const Task: React.FC<TaskProps> = ({ task }) => {
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);

  const router = useRouter();

  const handleSubmitEdit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
    });
    setTaskToEdit("");
    router.refresh();
    setOpenModalEdit(false);
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDelete(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <RiEditBoxLine
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={20}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEdit}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                type="text"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full"
              />
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          cursor="pointer"
          className="text-red-500"
          size={20}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task ?
          </h3>
          <div className="modal-action">
            <button className="btn" onClick={() => handleDelete(task.id)}>
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};
