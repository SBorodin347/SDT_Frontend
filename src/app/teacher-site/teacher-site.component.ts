import { Component } from '@angular/core';
import {Teacher, TeacherList} from "../models/teacher.model";
import {Router} from "@angular/router";
import {TeacherService} from "../../teacher.service";

@Component({
  selector: 'app-teacher-site',
  templateUrl: './teacher-site.component.html',
  styleUrls: ['./teacher-site.component.css']
})
export class TeacherSiteComponent {

  subjects: TeacherList[] = [];
  activeTeacher?: Teacher;

  constructor(private router: Router, private teacherService: TeacherService) { }

  // ngOnInit(): void{
  //   this.refreshTeachers();
  // }



}
