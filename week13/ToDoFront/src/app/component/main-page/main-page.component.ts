import { Component, OnInit } from '@angular/core';
import { ITaskList } from 'src/app/model/task-list';
import { TaskListProviderService } from 'src/app/service/task-list/task-list-provider.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth-service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  taskLists: ITaskList[] = [];

  public name: any = '';
  toggle = true;

  message: string = '';

  constructor(private taskListService: TaskListProviderService,
            private router: Router,
            private authService: AuthService) { }

  ngOnInit() {
    this.authService.change.subscribe(isOpen => {
      this.toggle = isOpen;

      this.getTaskLists();
    });

    this.getTaskLists();
  }

  getTaskLists(): void {
    this.taskListService.getTaskLists().then(res => {
      this.taskLists = res;
    },
    err => {
      this.taskLists = [];
    })
  }

  getTasks(taskList: ITaskList) {
    this.router.navigate(['/list', taskList.id]);
  }

  createTaskList() {    
    if (this.name !== '') {
      this.taskListService.createTaskList(this.name).then(res => {
        this.taskLists.push(res);

        console.log(this.name + ' task list created!');

        this.message = this.name + ' task list created!';
        setTimeout(() => {
          this.message = '';
        }, 2000);

        this.name = '';
      })
    }
  }

  deleteTaskList(taskList: ITaskList) {
    this.taskListService.deleteTaskList(taskList.id).then(res => {

      this.message = taskList.name + ' task list deleted!';
      setTimeout(() => {
        this.message = '';
      }, 2000);  
      
      this.taskListService.getTaskLists().then(taskLists => {
        this.taskLists = taskLists;
      });
    });
  }

}
