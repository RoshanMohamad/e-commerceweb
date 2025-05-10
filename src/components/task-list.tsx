"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Clock, Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import type { Task } from "@/types/task"
import { EditTaskDialog } from "@/components/edit-task-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface TaskListProps {
  tasks: Task[]
  isLoading: boolean
  onUpdateTask: (taskId: string, updates: Partial<Task>) => Promise<boolean>
  onDeleteTask: (taskId: string) => Promise<boolean>
}

export function TaskList({ tasks, isLoading, onUpdateTask, onDeleteTask }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleToggleComplete = async (task: Task) => {
    await onUpdateTask(task.id, { completed: !task.completed })
  }

  const handleEditClick = (task: Task) => {
    setEditingTask(task)
    setIsEditDialogOpen(true)
  }

  const handleDeleteClick = (taskId: string) => {
    setDeletingTaskId(taskId)
    setIsDeleteDialogOpen(true)
  }

  const handleEditTask = async (taskId: string, updates: Partial<Task>) => {
    const success = await onUpdateTask(taskId, updates)
    if (success) {
      setIsEditDialogOpen(false)
    }
    return success
  }

  const handleDeleteTask = async () => {
    if (deletingTaskId) {
      const success = await onDeleteTask(deletingTaskId)
      if (success) {
        setIsDeleteDialogOpen(false)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <Skeleton className="h-6 w-2/3" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
        <p className="text-muted-foreground mb-6">Create your first task to get started</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className={task.completed ? "bg-muted/50" : ""}>
            <CardHeader className="pb-2 flex flex-row items-start justify-between space-y-0">
              <div className="flex-1 pr-2">
                <h3
                  className={`font-medium text-lg line-clamp-1 ${
                    task.completed ? "text-muted-foreground line-through" : ""
                  }`}
                >
                  {task.title}
                </h3>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleEditClick(task)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDeleteClick(task.id)} className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <p className={`text-sm mb-4 line-clamp-3 ${task.completed ? "text-muted-foreground line-through" : ""}`}>
                {task.description}
              </p>
              {task.dueDate && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>Due {format(new Date(task.dueDate), "PPP")}</span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" onClick={() => handleToggleComplete(task)}>
                {task.completed ? (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4 text-primary" /> Completed
                  </>
                ) : (
                  <>
                    <Circle className="mr-2 h-4 w-4" /> Mark as Complete
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {editingTask && (
        <EditTaskDialog
          task={editingTask}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onUpdateTask={handleEditTask}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
