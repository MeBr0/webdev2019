import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskListProviderService } from 'src/app/service/task-list/task-list-provider.service';
import { ITask } from 'src/app/model/task';
import { ITaskList } from 'src/app/model/task-list';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tasks: ITask[] = [];
  taskList: ITaskList = {
    id: 0,
    name: ""
  };

  id: number;
  sub: any;

  public name: any = '';


  constructor( private taskListService: TaskListProviderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })

    this.taskListService.getTaskList(this.id).then(res => {
      this.taskList = res;
    })

    this.taskListService.getTasks(this.id).then(res => {
      this.tasks = res;
    })
  }

  doNothing(): void {

  }

  switchTask(task: ITask): void {
    // console.log(task);

    let ind = this.tasks.findIndex(t => t.id == task.id);

    // console.log(ind);

    // console.log(this.tasks[ind])

    if (this.tasks[ind].status == 'Not Done') {
      this.tasks[ind].status = 'Done';

      // console.log('switched to Done')
    }
    else {
      this.tasks[ind].status = 'Not Done';

      // console.log('switched to Not Done')
    }

    this.taskListService.updateTask(this.tasks[ind]);
}

  updateTaskList(): void {
    if (this.name != '') {
      return
    }

    this.taskListService.updateTaskList({ id: this.id, name: this.name }).then(res => {
      this.taskList = res;
    });
  }

  saveAndGoHome(): void {
    this.router.navigate(['/home'])
  }
}
