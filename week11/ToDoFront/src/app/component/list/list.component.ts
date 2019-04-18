import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskListService } from 'src/app/service/task-list/task-list.service';
import { ITask } from 'src/app/model/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  tasks: ITask[] = []

  id: number;
  sub: any;

  constructor( private taskListService: TaskListService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id']
    })

    this.taskListService.getTasks(this.id).then(res => {
      this.tasks = res;
    })
  }

  doNothing(): void {

  }

  goHome(): void {
    this.router.navigate(['/home'])
  }
}
