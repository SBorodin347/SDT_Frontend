import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SubjectList} from "../models/subject.model";

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent{


  constructor() { }

  @Input()
  subjects: SubjectList[] = [];

  @Output()
  editSubject: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  removeSubject: EventEmitter<number> = new EventEmitter<number>();

  edit(subjectId: number): void{
    this.editSubject.emit(subjectId);
  }

  remove(subjectId: number): void{
    this.removeSubject.emit(subjectId);
  }

}
