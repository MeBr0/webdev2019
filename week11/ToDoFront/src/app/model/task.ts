export interface ITask {
    id: number;
    createdAt: Date;
    dueOn: Date;
    status: string;
    taskList: number;
}