"use client";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { api } from "../utils/api";
import Header from "../components/Header";
import TaskItem from "../components/TaskItem";
import { NotebookPen } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [title, setTitle] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [status, setStatus] = React.useState("");

  const router = useRouter();

  const fetchTasks = async () => {
    try {
      const res = await api(`/tasks?search=${search}&status=${status}`);
      setTasks(res.tasks || res);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    fetchTasks();
  }, [search, status]);

  const handleAddTask = async () => {
    await api("/tasks", "POST", { title });

    if (!title) return toast.error("Please Add Title");

    toast.success("Task Added");
    setTitle("");
    fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await api(`/tasks/${id}`, "DELETE");
    toast.success("Task Deleted");
    fetchTasks();
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    await api(`/tasks/${id}/toggle`, "PATCH", { completed: !completed });
    fetchTasks();
  };

  const handleEditTask = async (id: string) => {
    const newTitle = prompt("Enter new Title");

    if (!newTitle) return toast.error("Please Add Title");

    await api(`/tasks/${id}`, "PATCH", { title: newTitle });
    toast.success("Task Updated");
    fetchTasks();
  };

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-6">
        <section className="p-2 my-5 flex flex-col md:flex-row gap-2 md:gap-4">
          {/* Add new task */}
          <div className=" mb-2 p-2 flex flex-col md:flex-row gap-2 flex-1">
            <input
              className="flex-1 p-3 rounded-xl 
            bg-background/70 
            text-foreground placeholder-gray-400 
            outline-none focus:ring-2 focus:ring-accent"
              placeholder="Add a new task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="bg-primary text-white py-4 rounded-xl 
            transition-all duration-300 
            hover:scale-105 active:scale-95 hover:opacity-90 hover:cursor-pointer md:px-4 hover"
              onClick={handleAddTask}
            >
              Add Task
            </button>
          </div>

          {/* Search + Filter */}
          <div className="p-2 flex flex-col md:flex-row gap-2">
            <input
              className="flex-1 p-2 rounded-xl 
            bg-background/70 text-foreground 
            outline-none focus:ring-2 focus:ring-accent"
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              className="p-2 rounded-xl 
            bg-background/70 text-foreground"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">All</option>
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>
          </div>
        </section>
        <section className="mt-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-primary ">Your Tasks</h1>

            <span className="text-sm opacity-70">
              {tasks.length} Task{tasks.length !== 1 && "s"}
            </span>
          </div>

          {/* Task Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {tasks?.length > 0 ? (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className="transition-all duration-300 hover:scale-[1.02]"
                >
                  <TaskItem
                    task={task}
                    onDelete={handleDeleteTask}
                    onToggle={handleToggleTask}
                    onEdit={handleEditTask}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center mt-16 opacity-70">
                {/* Icon */}
                <NotebookPen className="size-10 text-secondary"/>

                {/* Text */}
                <p className="mt-4 text-lg font-medium text-accent">
                  No tasks found
                </p>

                <p className="text-sm text-foreground/70">
                  Add your first task to get started
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
