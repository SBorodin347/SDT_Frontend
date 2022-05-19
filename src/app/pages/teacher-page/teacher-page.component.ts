import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {ROLE, User, UserList} from "../../models/user.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-teacher-page',
  templateUrl: './teacher-page.component.html',
  styleUrls: ['./teacher-page.component.scss']
})
export class TeacherPageComponent {

  teachers: UserList[] = [];
  activeTeacher?: User;
  popup: boolean = false;
  tab: number = 1;
  public searchString = '';

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void{
    this.currentPageUrl = this.router.url;
    this.refreshTeachers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public currentPageUrl: string;
  stringFormatter(str: string): string{
    return str.slice(0).charAt(1).toUpperCase() + str.slice(2).toLowerCase();
  }

  refreshTeachers(): void{
    this.userService.getUsersByRoleName(ROLE.TEACHER).subscribe(data => {
      console.log('Prislo:',data);
      this.teachers = data;
    });
  }

  add(teacher: User): void{
    this.userService.createUser(teacher).subscribe(data => {
      this.refreshTeachers();
    });
  }

  goCreate(): void{
    this.router.navigate(['/user']);
  }

  // edit(teacher: User): void{
  //   if(teacher.id !== undefined){
  //     this.userService.updateUser(teacher.id, teacher).subscribe(data => {
  //       this.refreshTeachers();
  //     });
  //   }
  // }

  // editTeacherFromList(teacherId: number): void{
  //   this.teacherService.getTeacher(teacherId).subscribe(data => {
  //     this.activeTeacher = data;
  //   });
  // }
  //
  // deleteTeacherFromList(teacherId: number): void{
  //   if(confirm('Are you sure?')){
  //     this.teacherService.deleteTeacher(teacherId).subscribe(data => {
  //       this.refreshTeachers();
  //     });
  //   }
  // }
  //


}
