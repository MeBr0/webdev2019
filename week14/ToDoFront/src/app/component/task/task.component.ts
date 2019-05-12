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

  public year: string;
  public month: string;
  public day: string;
  public hour: string;
  public minute: string;

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
    });

    this.taskListService.getTaskList(this.id).then(res => {
      this.taskList = res;

      this.taskListService.getTask(this.id, this.id2).then(res => {
        this.task = res; 

        console.log(this.task.created_at);

        this.task.created_at = new Date(this.task.created_at);
        this.task.created_at.setHours(this.task.created_at.getUTCHours());
        this.task.due_on = new Date(this.task.due_on);

        this.year = this.task.due_on.getFullYear().toString();
        this.month = (this.task.due_on.getMonth()+1).toString();
        this.day = this.task.due_on.getDate().toString();
        this.hour = this.task.due_on.getUTCHours().toString();
        this.minute = this.task.due_on.getMinutes().toString();
      });
    });

    
  }

  done(): void {
    this.task.status = true;

    console.log(this.task.name + ' switched to done!')
  }

  undone(): void {
    this.task.status = false;

    console.log(this.task.name + ' switched to undone!')
  }

  save(): void {
    if (this.checkFields()) {
      this.taskListService.updateTask({
        id: this.id2,
        name: this.task.name,
        created_at: this.task.created_at,
        due_on: new Date(+this.year, +(this.month)-1, +this.day, +this.hour, +this.minute, 0, 0),
        status: this.task.status,
        task_list: this.id,
        notes: this.task.notes
      }).then(res => {

        console.log(res);

        this.router.navigate(['/list', this.id]);      
      });

    }
    else {
      alert('fields are not valid!')
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

  activeDone(done: boolean): Object {
    if (done) return {
      'background-color': '#3F3',
	    color: 'inherit'
    }
    else return {
      'background-color': '#E80000',
	    color: 'inherit'
    }
  } 
}
