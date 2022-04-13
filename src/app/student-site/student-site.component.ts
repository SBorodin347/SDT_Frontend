import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {StudentService} from "../../student.service";
import {Student, StudentList} from "../models/student.model";

@Component({
  selector: 'app-student-site',
  templateUrl: './student-site.component.html',
  styleUrls: ['./student-site.component.css']
})
export class StudentSiteComponent {

  students: StudentList[] = [];
  activeStudent?: Student;

  constructor(private router: Router, private studentService: StudentService) { }

  ngOnInit(): void{
    this.refreshStudents();
  }

  refreshStudents(): void{
    this.studentService.getStudents().subscribe(data => {
      console.log('Prislo:',data);
      this.students = data;
    });
  }

  add(student: Student): void{
    this.studentService.createStudent(student).subscribe(data => {
      this.refreshStudents();
    });
  }

  edit(student: Student): void{
    if(student.id !== undefined){
      this.studentService.updateStudent(student.id, student).subscribe(data => {
        this.refreshStudents();
      });
    }
  }

  editStudentFromList(teacherId: number): void{
    this.studentService.getStudent(teacherId).subscribe(data => {
      this.activeStudent = data;
    });
  }

  deleteStudentFromList(teacherId: number): void{
    if(confirm('Are you sure?')){
      this.studentService.deleteStudent(teacherId).subscribe(data => {
        this.refreshStudents();
      });
    }
  }

}
