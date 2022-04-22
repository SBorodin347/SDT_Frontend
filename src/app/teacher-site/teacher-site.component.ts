import { Component } from '@angular/core';
import {Teacher, TeacherList} from "../models/teacher.model";
import {Router} from "@angular/router";
import {TeacherService} from "../services/teacher.service";

@Component({
  selector: 'app-teacher-site',
  templateUrl: './teacher-site.component.html',
  styleUrls: ['./teacher-site.component.css']
})
export class TeacherSiteComponent {

  teachers: TeacherList[] = [];
  activeTeacher?: Teacher;

  constructor(private router: Router, private teacherService: TeacherService) { }

  ngOnInit(): void{
    this.refreshTeachers();
  }

  refreshTeachers(): void{
    this.teacherService.getTeachers().subscribe(data => {
      console.log('Prislo:',data);
      this.teachers = data;
    });
  }

  add(teacher: Teacher): void{
    this.teacherService.createTeacher(teacher).subscribe(data => {
      this.refreshTeachers();
    });
  }

  edit(teacher: Teacher): void{
    if(teacher.id !== undefined){
      this.teacherService.updateTeacher(teacher.id, teacher).subscribe(data => {
        this.refreshTeachers();
      });
    }
  }

  editTeacherFromList(teacherId: number): void{
    this.teacherService.getTeacher(teacherId).subscribe(data => {
      this.activeTeacher = data;
    });
  }

  deleteTeacherFromList(teacherId: number): void{
    if(confirm('Are you sure?')){
      this.teacherService.deleteTeacher(teacherId).subscribe(data => {
        this.refreshTeachers();
      });
    }
  }



}
