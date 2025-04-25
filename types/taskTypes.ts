export type TaskType = {
    id: number;
    title: string;
    typeTitle: string;
    type: number;
    description: string;
    status: string;
    price: number;
    completedAt: string | null;
    timeToComplete: number;
    createdAt: string;
    updatedAt: string;
    executorId: number | null;
}

export type TaskAppliedPostType = {
  taskId: number;
  executorId: number;
  comment: string;
  phone: string;
  email: string;
  telegram: string;
  doNotCall: boolean;
}