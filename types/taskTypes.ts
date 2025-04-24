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