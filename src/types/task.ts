export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date | string;
  dueDate?: Date | string;
  priority?: string;
  status?: string;
}
