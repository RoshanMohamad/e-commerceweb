export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: string; // ISO string format
  completed: boolean;
  createAt: string; // ISO string format
  updateAt: string; // ISO string format

}