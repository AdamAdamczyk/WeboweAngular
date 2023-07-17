import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FilterTasksPipe } from './pipes/filter-tasks.pipe';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Dodaj import HttpClientModule
import { MatDialogModule } from '@angular/material/dialog';
import { TaskUpdateDialogComponent } from './task-update-dialog/task-update-dialog.component';
import { FilterFunctionalityPipe } from './pipes/filter-functionality.pipe';
import { CommonModule } from '@angular/common';
import { FunctionalityDetailComponent } from './functionality-detail/functionality-detail.component';
import { FunctionalityUpdateDialogComponent } from './functionality-update-dialog/functionality-update-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterTasksPipe,
    FilterFunctionalityPipe,
    TaskDetailComponent,
    TaskUpdateDialogComponent,
    FunctionalityDetailComponent,
    FunctionalityUpdateDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    CommonModule,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }