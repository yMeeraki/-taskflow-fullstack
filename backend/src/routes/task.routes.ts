import express from "express";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../middleware/auth.middleware";
import prisma from "../utils/prisma";

const router = express.Router();

/* =========================
   CREATE TASK
========================= */
router.post("/", authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ message: "Title is required" });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        userId: req.userId,
      },
    });

    res.status(201).json({ message: "Task created", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/* =========================
   GET TASKS (SEARCH + FILTER)
========================= */
router.get("/", authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { search = "", status } = req.query;

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId,

        title: {
          contains: String(search || ""),
        },

        ...(status && {
          completed: String(status) === "true",
        }),
      },
    });

    res.json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/* =========================
   GET SINGLE TASK
========================= */
router.get(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;

      const task = await prisma.task.findFirst({
        where: {
          id: String(id),
          userId: req.userId,
        },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.json({ task });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

/* =========================
   UPDATE TASK
========================= */
router.patch(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      const existingTask = await prisma.task.findFirst({
        where: {
          id: String(id),
          userId: req.userId,
        },
      });

      if (!existingTask) {
        return res.status(404).json({ message: "Task not found" });
      }

      const updatedTask = await prisma.task.update({
        where: { id: String(id) },
        data: {
          ...(title && { title: title.trim() }),
          ...(typeof completed === "boolean" && { completed }),
        },
      });

      res.json({ message: "Task updated", task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

/* =========================
   TOGGLE TASK
========================= */
router.patch(
  "/:id/toggle",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;

      const task = await prisma.task.findFirst({
        where: {
          id: String(id),
          userId: req.userId,
        },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      const updatedTask = await prisma.task.update({
        where: { id: String(id) },
        data: {
          completed: !task.completed,
        },
      });

      res.json({ message: "Toggled", task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

/* =========================
   DELETE TASK
========================= */
router.delete(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;

      const task = await prisma.task.findFirst({
        where: {
          id: String(id),
          userId: req.userId,
        },
      });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      await prisma.task.delete({
        where: { id: String(id) },
      });

      res.json({ message: "Task deleted" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

export default router;
