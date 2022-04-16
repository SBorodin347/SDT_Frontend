import {Component, Input, Output} from '@angular/core';
import {Subject, SubjectList} from "../models/subject.model";
import {SubjectService} from "../../subject.service";
import {Router} from "@angular/router";
import {TeacherList} from "../models/teacher.model";
import {TeacherService} from "../../teacher.service";


enum NAV {SUBJECTS, USERS,HOME}
@Component({
  selector: 'app-subject-site',
  templateUrl: './subject-site.component.html',
  styleUrls: ['./subject-site.component.css']
})

export class SubjectSiteComponent{

  subjects: SubjectList[] = [];
  teachers: TeacherList[] = [];
  activeSubject?: Subject;
  popup = false;

  constructor(private router: Router, private subjectService: SubjectService, private teacherService: TeacherService) { }

  navig = NAV;

  public openPopup(){
    this.popup = true;
  }

  public closePopup(){
    this.activeSubject = null;
    this.popup = false;
  }

  ngOnInit(): void{
    this.refreshSubjects();
    this.refreshTeachers();
  }

  refreshSubjects(): void{
    this.subjectService.getSubjects().subscribe(data => {
      console.log('Prislo:',data);
      this.subjects = data;
    });
  }

  refreshTeachers(): void{
    this.teacherService.getTeachers().subscribe(data => {
      console.log('Prislo:',data);
      this.teachers = data;
    });
  }

  add(subject: Subject): void{
    this.subjectService.createSubject(subject).subscribe(data => {
      this.refreshSubjects();
    });
  }

  edit(subject: Subject): void{
    if(subject.id !== undefined){
      this.subjectService.updateSubject(subject.id, subject).subscribe(data => {
        this.refreshSubjects();
      });
    }
  }

  editSubjectFromList(subjectId: number): void{
    this.subjectService.getSubject(subjectId).subscribe(data => {
      this.popup = true;
      this.activeSubject = data;
    });
  }

  deleteSubjectFromList(subjectId: number): void{
    if(confirm('Are you sure?')){
      this.subjectService.deleteSubject(subjectId).subscribe(data => {
        this.refreshSubjects();
      });
    }
  }


}
