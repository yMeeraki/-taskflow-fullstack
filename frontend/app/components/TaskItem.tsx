"use client";
import { Square, SquareCheck, SquarePen, Trash } from "lucide-react";

export default function TaskItem({ task, onDelete, onToggle, onEdit }: any) {
  return (
    <div className="bg-secondary/30  backdrop-blur-md p-5 flex justify-between rounded-xl">
      <span className={`${task.completed ? "line-through opacity-60" : ""}`}>
        {task.title}
      </span>
      <div className="flex gap-2">
        <button
          className="bg-green-500 hover:bg-green-600 hover:cursor-pointer px-3 py-1 rounded-lg text-white"
          onClick={() => onToggle(task.id, task.completed)}
        >
          {!task.completed ? <Square /> : <SquareCheck />}
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 hover:cursor-pointer px-3 py-1 rounded-lg text-white"
          onClick={() => onEdit(task.id)}
        >
          <SquarePen />
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 hover:cursor-pointer px-3 py-1 rounded-lg text-white"
          onClick={() => onDelete(task.id)}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
}
