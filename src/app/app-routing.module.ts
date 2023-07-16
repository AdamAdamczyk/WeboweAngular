import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FunctionalityDetailComponent } from './functionality-detail/functionality-detail.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'functionality', component: FunctionalityDetailComponent },
  { path: 'task/:id', component: TaskDetailComponent },
  { path: 'functionality/:id', component: FunctionalityDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }