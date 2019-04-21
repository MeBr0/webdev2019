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
  tasks: ITask[] = [{
    id: 0,
    name: '',
    created_at: null,
    due_on: null,
    status: false,
    task_list: 0
  }];
  taskList: ITaskList = {
    id: 0,
    name: ""
  }
  
  id: number;
  sub: any;
  creating: boolean = true;

  message: string;

  public name: any = '';
  public taskName: any = '';


  constructor( private taskListService: TaskListProviderService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getTasks();
  }

  getTasks(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
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

  switchCreate(): void {
    this.creating = !this.creating;
  }

  isEmpty(): boolean {
    return !this.tasks || !this.tasks.length;
  }

  switchTask(task: ITask): void {
    let ind = this.tasks.findIndex(t => t.id == task.id);

    this.tasks[ind].status = !this.tasks[ind].status;

    this.taskListService.updateTask(this.tasks[ind]);
  }

  deleteTask(task: ITask): void {
    this.taskListService.deleteTask(task).then(res => {

      this.message = task.name + ' task deleted!';
      setTimeout(() => {
        this.message = '';
      }, 2000);  

      this.taskListService.getTasks(this.id).then(tasks => {
        this.tasks = tasks;
      });
    })
  }

  updateTaskList(): void {
    if (this.name != '') {

      this.taskListService.updateTaskList({ id: this.id, name: this.name }).then(res => {

        this.message = 'Task list name changed to "' + this.name + '"!';
        setTimeout(() => {
          this.message = '';
        }, 2000);  

        this.taskList = res;
      });
    }
  }

  saveAndGoHome(): void {
    this.router.navigate(['/home']);
  }

  addTask(): void {
    if (this.taskName != '') {

      // console.log(this.taskName);
      this.taskListService.createTask({
        id: 0,
        name: this.taskName,
        created_at: new Date(),
        due_on: new Date(),
        status: false,
        task_list: this.id
      }).then(res => {

        this.message = this.taskName + ' task created in ' + this.taskList.name;
        setTimeout(() => {
          this.message = '';
        }, 2000);  

        this.taskName = '';

        this.taskListService.getTasks(this.id).then(tasks => {
          this.tasks = tasks;
        })
      })

    }
  }

  editTask(task: ITask): void {
    this.router.navigate(['/list', this.taskList.id, 'edit', task.id]);
  }
}
