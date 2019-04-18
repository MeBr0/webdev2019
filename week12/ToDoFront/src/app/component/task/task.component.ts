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
  task: ITask;

  taskList: ITaskList = {
    id: 0,
    name: ""
  };
  
  id: number;
  id2: number;
  sub: any;

  public name: string = '';

  public year: number = 0;
  public month: number = 0;
  public day: number = 0;
  public hour: number = 0;
  public minute: number = 0;

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

      this.taskListService.getTask(this.id, this.id2).then(res => {
        this.task = res; 

        this.task.created_at = new Date(this.task.created_at);
        this.task.due_on = new Date(this.task.due_on);

        console.log(this.task.created_at);
        console.log(this.task.due_on);

        // console.log(this.task.created_at.getFullYear());
        // console.log(this.task.created_at.getMonth()+1);
        // console.log(this.task.created_at.getUTCDate());
        // console.log(this.task.created_at.getUTCHours());
        // console.log(this.task.created_at.getMinutes());


        this.year = this.task.due_on.getFullYear();
        this.month = this.task.due_on.getMonth()+1;
        this.day = this.task.due_on.getUTCDate();
        this.hour = this.task.due_on.getUTCHours();
        this.minute = this.task.due_on.getMinutes();
      });
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
      console.log(new Date(this.year, this.month, this.day, this.hour, this.minute, 0, 0));  


      this.taskListService.updateTask({
        id: 0,
        name: this.name,
        created_at: this.task.created_at,
        due_on: new Date(this.year, this.month, this.day, this.hour, this.minute, 0, 0),
        status: this.task.status,
        task_list: 0 
      }).then(res => {


        this.taskListService.getTask(this.id, this.id2).then(res => {
          this.task = res;

          this.task.created_at = new Date(this.task.created_at);
          this.task.due_on = new Date(this.task.due_on);
        });

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
     this.taskListService.deleteTask(this.task).then(res => {
       console.log(this.task.name + ' task deleted!');

       this.router.navigate(['/list', this.id]);
     });
  }

}
