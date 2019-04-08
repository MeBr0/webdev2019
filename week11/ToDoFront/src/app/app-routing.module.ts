import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './component/main-page/main-page.component';
import { ListComponent } from './component/list/list.component';

const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'list/:id', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
