import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Task}          from '../task';
import {Priority}      from '../priority';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
styles: [`.u2u-hand {cursor: pointer;}`]  
})
export class TaskCardComponent {
  low = Priority.Low;
  normal = Priority.Normal;
  high = Priority.High;

  @Input() task!: Task;
  @Output() onClicked = new EventEmitter<Task>();
  @Output() onCompleted = new EventEmitter<Task>();
  @Output() onCancelled = new EventEmitter<Task>();

  setCompleted(task: Task, event: Event) {
    task.completed = !task.completed;
    this.onCompleted.emit(task);
    event.stopPropagation();
  };

  setCancelled(task: Task, event: Event) {
    this.onCancelled.emit(task);
    event.stopPropagation();
  }

  

}
