import { Component, OnInit } from '@angular/core';
import { ITaskList } from 'src/app/model/task-list';
import { TaskListProviderService } from 'src/app/service/task-list/task-list-provider.service';
import { Router } from '@angular/router';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  taskLists: ITaskList[] = [];

  public name: any = '';

  constructor(private taskListService: TaskListProviderService,
            private router: Router) { }

  ngOnInit() {
    this.getTaskLists();
  }

  getTaskLists(): void {
    this.taskListService.getTaskLists().then(res => {
      this.taskLists = res;
    })
  }

  getTasks(taskList: ITaskList) {
    this.router.navigate(['/list', taskList.id]);
  }

  createTaskList() {
    console.log(this.name);
    
    if (this.name !== '') {
      this.taskListService.createTaskList(this.name).then(res => {
        this.name = '';
        this.taskLists.push(res);
      })
    }
  }

  deleteTaskList(taskList: ITaskList) {
    this.taskListService.deleteTaskList(taskList.id).then(res => {
      console.log(taskList.id)
      
      this.taskListService.getTaskLists().then(taskLists => {
        this.taskLists = taskLists;
      });
    });
  }

}
