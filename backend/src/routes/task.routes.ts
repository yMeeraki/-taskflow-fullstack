import express from "express";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../middleware/auth.middleware";
import prisma from "../utils/prisma";

const router = express.Router();

// Create a new task
router.post("/", authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { title } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        userId: req.userId,
      },
    });

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    res.json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get all tasks for the authenticated user
router.get("/", authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.userId,
      },
    });
    res.json({ message: "Tasks retrieved successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get All tasks (with search and pagination)
router.get(
  "/all",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { search = "", page = 1, limit = 10, status } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const tasks = await prisma.task.findMany({
        where: {
          userId: req.userId,
          title: {
            contains: String(search),
          },
          ...(status && { completed: String(status) === "true" }),
        },
        skip: skip,
        take: Number(limit),
      });
      res.json({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// Delete a task
router.delete(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Task ID is required" });
      }

      await prisma.task.delete({
        where: {
          id: String(id),
          userId: Array.isArray(req.userId) ? req.userId[0] : req.userId,
        },
      });

      res.json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// Toggle task completion
router.patch(
  "/:id/toggle",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: {
          id: String(id),
          userId: Array.isArray(req.userId) ? req.userId[0] : req.userId,
        },
      });
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      const updatedTask = await prisma.task.update({
        where: {
          id: String(id),
          userId: Array.isArray(req.userId) ? req.userId[0] : req.userId,
        },
        data: {
          completed: !task.completed,
        },
      });
      res.json({
        message: "Task completion toggled successfully",
        task: updatedTask,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// Get a single task by ID
router.get(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const task = await prisma.task.findUnique({
        where: {
          id: String(id),
          userId: Array.isArray(req.userId) ? req.userId[0] : req.userId,
        },
      });
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.json({ message: "Task retrieved successfully", task });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

// Update a task
router.patch(
  "/:id",
  authenticateToken,
  async (req: AuthenticatedRequest, res) => {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      if (!title) {
        return res.status(400).json({ message: "Title required" });
      }

      const updatedTask = await prisma.task.update({
        where: {
          id: String(id),
        },
        data: {
          title,
          completed,
        },
      });

      res.json({ message: "Task updated successfully", task: updatedTask });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },
);

export default router;
