import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskListProviderService } from 'src/app/service/task-list/task-list-provider.service';
import { ITask } from 'src/app/model/task';
import { ITaskList } from 'src/app/model/task-list';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  task: ITask = {
    id: 0,
    name: '',
    created_at: new Date(),
    due_on: new Date(),
    status: 'Done',
    task_list: 0
  };

  taskList: ITaskList = {
    id: 0,
    name: ""
  };
  
  id: number;
  id2: number;
  sub: any;

  public name: string = '';

  public year: any = '';
  public month: any = '';
  public day: any = '';
  public hour: any = '';
  public minute: any = '';

  constructor( private taskListService: TaskListProviderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.id2 = +params['id2'];

      console.log(this.id);
      console.log(this.id2);

    });

    this.taskListService.getTaskList(this.id).then(res => {
      this.taskList = res;

      console.log(this.taskList);
    });

    this.taskListService.getTask(this.id, this.id2).then(res => {
      this.task = res;

      this.task.created_at = new Date(this.task.created_at);
      this.task.due_on = new Date(this.task.due_on);

      console.log(this.task);
    });
  }

  done(): void {
    this.task.status = 'Done';
  }

  undone(): void {
    this.task.status = 'Not Done';
  }

  save(): void {
    if (this.checkFields()) {
      this.task.name = this.name;

      console.log(this.year + '-' + this.month + '-' + this.day + 'T' + this.hour + ':' + this.minute + ':00');

      this.task.due_on = new Date(this.year + '-' + this.month + '-' + this.day + 'T' + this.hour + ':' + this.minute + ':00');

      this.taskListService.updateTask(this.task).then(res => {
        console.log('Saved!');
      });
    }
    else {
      // TODO notify
    }
  }

  checkFields(): boolean {
    return true;
  }

  delete(): void {

  }

}
