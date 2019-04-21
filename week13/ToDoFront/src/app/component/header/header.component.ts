import { Component, OnInit } from '@angular/core';
import { TaskListProviderService } from 'src/app/service/task-list/task-list-provider.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceLoader } from '@angular/compiler';
import { AuthService } from 'src/app/service/auth/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  login: string;
  password: string;

  constructor(private taskListService: TaskListProviderService,
                private router: Router,
                private authService: AuthService) { }

  ngOnInit() {

  }

  logIn(): void {
    if (this.login != '' && this.password != '') {
      this.taskListService.login(this.login, this.password).then(res => {
        console.log('token ' + res.token);

        localStorage.setItem('token', res.token);

        this.authService.toggle();

      });
    }
  }

  logOut(): void {
    this.taskListService.logout().then(res => {
      console.log(localStorage);
      
      localStorage.clear();
      
      this.authService.toggle();
    });
  }

  checkLocalStorage(): boolean {
    // console.log(localStorage['token']);
    
    return localStorage['token'] != null;
  }

}
