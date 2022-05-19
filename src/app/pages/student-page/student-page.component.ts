import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {ROLE, User, UserList} from "../../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent {

  students: UserList[] = [];
  activeStudent?: User;

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void{
    this.currentPageUrl = this.router.url;
    this.refreshStudents();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public currentPageUrl: string;
  stringFormatter(str: string): string{
    return str.slice(0).charAt(1).toUpperCase() + str.slice(2).toLowerCase();
  }

  refreshStudents(): void{
    this.userService.getUsersByRoleName(ROLE.STUDENT).subscribe(data => {
      this.students = data;
    });
  }

  goCreate(): void{
    this.router.navigate(['/user']);
  }

  // add(student: Student): void{
  //   this.studentService.createStudent(student).subscribe(data => {
  //     this.refreshStudents();
  //   });
  // }
  //
  // edit(student: Student): void{
  //   if(student.id !== undefined){
  //     this.studentService.updateStudent(student.id, student).subscribe(data => {
  //       this.refreshStudents();
  //     });
  //   }
  // }
  //
  // editStudentFromList(teacherId: number): void{
  //   this.studentService.getStudent(teacherId).subscribe(data => {
  //     this.activeStudent = data;
  //   });
  // }
  //
  // deleteStudentFromList(teacherId: number): void{
  //   if(confirm('Are you sure?')){
  //     this.studentService.deleteStudent(teacherId).subscribe(data => {
  //       this.refreshStudents();
  //     });
  //   }
  // }

}
