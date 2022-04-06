import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: []
})
export class TaskListComponent implements OnInit {
  @Input() tasks!: Task[];
  @Output() onCancelled = new EventEmitter<Task>();
  @Output() onTaskClicked = new EventEmitter<Task>();
  
  constructor() { }

  ngOnInit() {
  }

}
