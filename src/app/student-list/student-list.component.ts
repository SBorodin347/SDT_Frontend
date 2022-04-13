import {Component, EventEmitter, Input, Output} from '@angular/core';
import {StudentList} from "../models/student.model";

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent{

  constructor() { }

  @Input()
  students: StudentList[] = [];

  @Output()
  editStudent: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  removeStudent: EventEmitter<number> = new EventEmitter<number>();

  edit(studentId: number): void{
    this.editStudent.emit(studentId);
  }

  remove(studentId: number): void{
    this.removeStudent.emit(studentId);
  }

}
