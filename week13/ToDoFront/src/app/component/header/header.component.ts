import { Component, OnInit } from '@angular/core';
import { TaskListProviderService } from 'src/app/service/task-list/task-list-provider.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: string;
  password: string;

  constructor(private taskListService: TaskListProviderService,
                private router: Router) { }

  ngOnInit() {

  }

  logIn(): void {
    if (this.login != '' && this.password != '') {
      this.taskListService.login(this.login, this.password).then(res => {
        console.log('token ' + res.token);

        localStorage.setItem('token', res.token);

        Location.reload();
      });
    }
  }

  logOut(): void {
    this.taskListService.logout().then(res => {
      console.log(localStorage);
      
      localStorage.clear();

      this.router.navigate(['']); 

    });
  }

  checkLocalStorage(): boolean {
    // console.log(localStorage['token']);
    
    return localStorage['token'] != null;
  }

}
