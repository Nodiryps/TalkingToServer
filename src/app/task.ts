import { Priority } from './priority';

// export interface Task{
//   id: number;
//   description: string;
//   completed: boolean;
//   priority: Priority;
// }


export class Task {

  constructor(public id: number = 0,
              public description: string = '',
              public completed: boolean = false,
              public priority: Priority = Priority.Normal,
              public startDate?: Date,
              public endDate?: Date) { }

  clone(): Task {
    return new Task(this.id, this.description, this.completed, this.priority, this.startDate, this.endDate);
  }
}