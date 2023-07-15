import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Dodaj import HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    FilterTasksPipe,
    TaskDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    RouterModule,
    FormsModule,
    HttpClientModule // Dodaj HttpClientModule do listy importów
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
