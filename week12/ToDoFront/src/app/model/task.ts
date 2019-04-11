export interface ITask {
    id: number;
    name: string;
    created_at: Date;
    due_on: Date;
    status: string;
    task_list: number;
}