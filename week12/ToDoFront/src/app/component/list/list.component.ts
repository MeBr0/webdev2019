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
export class ListComponent implements OnInit{
  tasks: ITask[] = []
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

  updateTaskList(): void {
    this.taskListService.updateTaskList({ id: this.id, name: this.name }).then(res => {
      this.taskList = res;
    });
  }

  goHome(): void {
    this.router.navigate(['/home'])
  }
}
