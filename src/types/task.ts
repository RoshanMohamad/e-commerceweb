export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO string format
  completed: boolean;
}