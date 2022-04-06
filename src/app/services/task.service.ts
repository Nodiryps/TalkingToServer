import { Task } from '../task';
import { Priority } from '../priority';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class TaskService {
  abstract getAllTasks(): Observable<Task[]>;
  abstract addTask(task: Task): Observable<Task[]>;
  abstract removeTask(task: Task): Observable<Task[]>;
  abstract updateTask(task: Task): Observable<Task[]>;
}
