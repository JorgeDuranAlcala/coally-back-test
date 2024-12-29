export interface ITask {
  id: string;
  title: string;
  userId: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}