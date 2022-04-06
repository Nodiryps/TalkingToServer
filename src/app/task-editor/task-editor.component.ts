import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Priority, PRIORITIES } from '../priority';
import { Task } from '../task';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { CustomValidators } from '../custom-validators';

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styles: [`
.u2u-show { display: block; }
.u2u-hide { display: none; }
.ng-touched.ng-invalid { border-bottom: 1px solid #f44336 !important;}
.ng-touched.ng-valid { border-bottom: 1px solid #009688 !important;}

`]
})
export class TaskEditorComponent implements OnInit, OnChanges {
  

  @Input() displayed: boolean = false;
  @Input() task!: Task;
  @Output() onRequestClose = new EventEmitter();
  priorities = PRIORITIES;
  form!: FormGroup;

  
  public get editorClasses() : {[key: string]:boolean} {
    return {
      "u2u-show": this.displayed,
      "u2u-hide": !this.displayed
    };
  }
  

  constructor(private _taskService: TaskService,
              private _formBuilder: FormBuilder) { }

  close(): void {
    this.onRequestClose.emit();
  }

  getNameForPriority(priority: Priority): string {
    return Priority[priority];
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (let key in changes) {
      if (key === "task" && !changes[key].isFirstChange()) {
        let task = <Task>changes[key].currentValue;
        this.form.setValue({
          'description': task.description,
          'priority': task.priority,
          'startDate': moment(task.startDate).format('YYYY-MM-DD'),
          'endDate': moment(task.endDate).format('YYYY-MM-DD')
        });
      }
    }
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      'description': ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      'priority': [''],
      'startDate': [''],
      'endDate': ['']
    });

    this.form.controls['endDate'].setValidators(
      CustomValidators.notBefore(this.form.controls['startDate']));

    this.form.controls['startDate'].valueChanges.subscribe(
      (newStartDate: string) => {
        this.form.controls['endDate'].updateValueAndValidity();
    });


  }

  onSubmit(): void {
    if (!this.form.valid) { return; }

    this.task.description = this.form.value.description;
    this.task.priority = this.form.value.priority;
    this.task.startDate = moment(this.form.value.startDate).toDate();
    this.task.endDate = moment(this.form.value.endDate).toDate();
  
    this._taskService.updateTask(this.task).subscribe(() => this.close());
  
    this.close();
  }
  
}
