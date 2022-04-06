import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';

import {TaskService} from "./task.service";
import {Task} from '../task'

@Injectable({
    providedIn: 'root'
})
export class HttpTaskService extends TaskService {

    private tasksUrl = 'https://u2utasks.azurewebsites.net/tasks';

    constructor(private http: HttpClient) {
        super();
    }

    addTask(task: Task): Observable<Task[]> {
        return this.http.post<Task>(this.tasksUrl, task)
            .pipe(
                switchMap(() => this.getAllTasks()),
                catchError(this.handleError));
    }

    getAllTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.tasksUrl).pipe(
            catchError(this.handleError)
        );
    }

    removeTask(task: Task): Observable<Task[]> {
        return this.http.delete<Task>(`${this.tasksUrl}/${task.id}`)
            .pipe(
                switchMap(() => this.getAllTasks()),
                catchError(this.handleError));
    }

    updateTask(task: Task): Observable<Task[]> {
        return this.http.put<Task[]>(`${this.tasksUrl}/${task.id}`, task)
            .pipe(
                switchMap(() => this.getAllTasks()),
                catchError(this.handleError)
            );
    }

    private handleError(error: Response): Observable<any> {
        console.error(error);
        return throwError(error || 'Server error');
    }
}
