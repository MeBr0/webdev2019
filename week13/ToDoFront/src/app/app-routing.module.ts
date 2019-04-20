import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './component/main-page/main-page.component';
import { ListComponent } from './component/list/list.component';
import { TaskComponent } from './component/task/task.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainPageComponent, runGuardsAndResolvers: 'always'},
  { path: 'list/:id', component: ListComponent },
  { path: 'list/:id/edit/:id2', component: TaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
