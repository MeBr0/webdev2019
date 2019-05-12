import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskListService } from './task-list.service';
import { ITaskList } from 'src/app/model/task-list';
import { ITask } from 'src/app/model/task';
import { IToken } from 'src/app/model/token';

@Injectable({
  providedIn: 'root'
})
export class TaskListProviderService extends TaskListService {

  constructor(http: HttpClient) { 
    super(http);
  }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get('http://127.0.0.1:8000/api/task_lists/', {});
  } 

  getTaskList(id: number): Promise<ITaskList> {
    return this.get('http://127.0.0.1:8000/api/task_lists/' + id + '/', {});
  }

  getTasks(id: number): Promise<ITask[]> {
    return this.get('http://127.0.0.1:8000/api/task_lists/' + id + '/tasks/', {});
  }

  createTaskList(name: any): Promise<ITaskList> {
    return this.post('http://127.0.0.1:8000/api/task_lists/', { name : name });
  }

  deleteTaskList(id: number): Promise<any> {
    return this.del('http://127.0.0.1:8000/api/task_lists/' + id + '/', {});
  }

  updateTaskList(taskList: ITaskList): Promise<ITaskList> {
    return this.put('http://127.0.0.1:8000/api/task_lists/' + taskList.id + '/', taskList);
  }

  updateTask(task: ITask): Promise<ITask> {
    return this.put('http://127.0.0.1:8000/api/task_lists/' + task.task_list + '/tasks/' + task.id + '/', task)
  }

  deleteTask(task: ITask): Promise<any> {
    return this.del('http://127.0.0.1:8000/api/task_lists/' + task.task_list + '/tasks/' + task.id + '/', {})
  }

  createTask(task: ITask): Promise<any> {
    return this.post('http://127.0.0.1:8000/api/task_lists/' + task.task_list + '/tasks/', task)
  }

  getTask(id: number, id2: number): Promise<ITask> {
    return this.get('http://127.0.0.1:8000/api/task_lists/' + id + '/tasks/' + id2 + '/', {})
  }

  login(login: string, password: string): Promise<IToken> {
    return this.post('http://127.0.0.1:8000/auth/login/', {
      username: login,
      password: password
    });
  }

  logout(): Promise<any> {
    return this.post('http://127.0.0.1:8000/auth/logout/', {});
  }
}