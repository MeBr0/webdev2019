import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskListService } from './task-list.service';
import { ITaskList } from 'src/app/model/task-list';
import { ITask } from 'src/app/model/task';

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

  getTasks(id: number): Promise<ITask[]> {
    // console.log('http://127.0.0.1:8000/api/task_lists/' + id + '/tasks/');

    return this.get('http://127.0.0.1:8000/api/task_lists/' + id + '/tasks/', {});
  }

  createTaskList(name: any): Promise<ITaskList> {
    return this.post('http://127.0.0.1:8000/api/task_lists/', { name : name });
  }


}