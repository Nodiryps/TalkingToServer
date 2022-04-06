import { Component, OnInit } from "@angular/core";

import { Task } from "./task";
import { Priority } from "./priority";
import { TaskService } from "./services/task.service";
import {Observable} from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  editableTask!: Task;
  isEditorDisplayed = false;

  constructor(private _taskService: TaskService) {}

  onTaskClicked(task: Task): void {
    this.editableTask = task;
    this.isEditorDisplayed = true;
  }

  onEditorCloseRequested(): void {
    this.isEditorDisplayed = false;
  }

  ngOnInit(): void {
    this.tasks$ = this._taskService.getAllTasks();
  }

  addTaskToList(task: Task): void {
    this.tasks$ = this._taskService.addTask(task);
  }
  removeTaskFromList(task: Task): void {
    this.tasks$ = this._taskService.removeTask(task);
  }
}
