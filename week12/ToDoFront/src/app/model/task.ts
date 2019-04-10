export interface ITask {
    id: number;
    created_at: Date;
    due_on: Date;
    status: string;
    task_list: number;
}