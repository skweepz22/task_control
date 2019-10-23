import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';


const routes: Routes = [
  {path:"", redirectTo:"home" ,pathMatch:"full"},
  {path: "home", pathMatch:"full", component:HomeComponent},
  {path:"tasks", pathMatch:"full", component:TasksComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
