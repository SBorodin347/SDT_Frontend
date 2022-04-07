import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TeacherList} from "../models/teacher.model";

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.css']
})
export class TeacherListComponent {

  constructor() { }

  @Input()
  teachers: TeacherList[] = [];

  @Output()
  editTeacher: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  removeTeacher: EventEmitter<number> = new EventEmitter<number>();

  edit(teacherId: number): void{
    this.editTeacher.emit(teacherId);
  }

  remove(teacherId: number): void{
    this.removeTeacher.emit(teacherId);
  }

}
