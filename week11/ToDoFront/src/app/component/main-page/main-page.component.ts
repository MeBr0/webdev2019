import { Component, OnInit } from '@angular/core';
import { ITaskList } from 'src/app/model/task-list';
import { TaskListService } from 'src/app/service/task-list/task-list.service';
import { Router } from '@angular/router';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  taskLists: ITaskList[] = [];

  constructor(private taskListService: TaskListService,
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

}
