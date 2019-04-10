import { Injectable } from '@angular/core';
import { ITaskList } from 'src/app/model/task-list';
import { ITask } from 'src/app/model/task';
import { HttpClient } from '@angular/common/http';
import { TaskListProviderService } from './task-list-provider.service';

@Injectable({
  providedIn: 'root'
})
export class TaskListService extends TaskListProviderService {

  constructor(http: HttpClient) { 
    super(http);
  }

  getTaskLists(): Promise<ITaskList[]> {
    return this.get('http://127.0.0.1:8000/api/task_lists/', {});
  } 

  getTasks(id: number): Promise<ITask[]> {
    // console.log('http://127.0.0.1:8000/api/task_lists/' + id + '/tasks/');

    return this.get('http://127.0.0.1:8000/api/task_lists/' + id + '/tasks/', {})
  }
}
