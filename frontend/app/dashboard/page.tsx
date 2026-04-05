"use client";

import React, { useEffect } from "react";
import { api } from "../utils/api";

export default function Dashboard() {
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [title, setTitle] = React.useState("");

  const fetchTasks = async () => {
    try {
      const res = await api("/tasks");
      setTasks(res.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      console.log("No token, skipping fetch");

      return;
    }
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    await api("/tasks", "POST", { title });
    setTitle("");
    fetchTasks();
  };

  const handleDeleteTask = async (id: string) => {
    await api(`/tasks/${id}`, "DELETE");
    fetchTasks();
  };

  const handleToggleTask = async (id: string, completed: boolean) => {
    await api(`/tasks/${id}/toggle`, "PATCH", { completed: !completed });
    fetchTasks();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <input
          placeholder="New Task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <span>{task.title}</span>
            <button onClick={() => handleToggleTask(task.id, task.completed)}>
              {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
