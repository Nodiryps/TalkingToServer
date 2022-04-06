import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TaskCreatorComponent } from './task-creator/task-creator.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './task.service';
import { MockTaskService } from './mock-task.service';
import { TaskEditorComponent } from './task-editor/task-editor.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TaskCreatorComponent,
    TaskCardComponent,
    TaskListComponent,
    TaskEditorComponent,
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [{ provide: TaskService, useClass: MockTaskService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
