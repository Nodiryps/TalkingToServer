import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TaskCreatorComponent } from './task-creator/task-creator.component';
import { TaskCardComponent } from './task-card/task-card.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskService } from './services/task.service';
import { TaskEditorComponent } from './task-editor/task-editor.component';
import {HttpClientModule} from '@angular/common/http';
import {HttpTaskService} from './services/http-task.service';


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
  providers: [{ provide: TaskService, useClass: HttpTaskService }],
  bootstrap: [AppComponent]
})
export class AppModule { }
