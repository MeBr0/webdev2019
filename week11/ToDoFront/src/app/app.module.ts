import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './component/main-page/main-page.component';
import { HeaderComponent } from './component/header/header.component';
import { TaskListService } from './service/task-list/task-list.service';
import { ListComponent } from './component/list/list.component'; 


import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    ListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    TaskListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
