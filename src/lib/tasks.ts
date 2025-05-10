import type { Task } from "@/types/task"

// Mock database
let tasks: Task[] = [
  {
    id: "task-1",
    title: "Complete project proposal",
    description: "Write and submit the project proposal for the new client.",
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  },
  {
    id: "task-2",
    title: "Review pull requests",
    description: "Review and merge the pending pull requests from the team.",
    completed: true,
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
  },
  {
    id: "task-3",
    title: "Prepare for presentation",
    description: "Create slides and prepare notes for the upcoming client presentation.",
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
  },
]

// In a real app, these functions would make API calls to a backend server

export async function getTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...tasks])
    }, 500)
  })
}

export async function createTask(title: string, description: string, dueDate?: Date): Promise<Task> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTask: Task = {
        id: `task-${Date.now()}`,
        title,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate: dueDate ? dueDate.toISOString() : undefined,
      }
      tasks = [...tasks, newTask]
      resolve(newTask)
    }, 500)
  })
}

export async function updateTask(taskId: string, updates: Partial<Task>): Promise<Task> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskIndex = tasks.findIndex((task) => task.id === taskId)
      if (taskIndex === -1) {
        reject(new Error("Task not found"))
        return
      }

      const updatedTask = { ...tasks[taskIndex], ...updates }
      tasks = [...tasks.slice(0, taskIndex), updatedTask, ...tasks.slice(taskIndex + 1)]
      resolve(updatedTask)
    }, 500)
  })
}

export async function deleteTask(taskId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const taskIndex = tasks.findIndex((task) => task.id === taskId)
      if (taskIndex === -1) {
        reject(new Error("Task not found"))
        return
      }

      tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]
      resolve()
    }, 500)
  })
}
