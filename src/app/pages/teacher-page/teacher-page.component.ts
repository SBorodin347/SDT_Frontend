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
  public currentPageUrl: string;

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void{
    this.currentPageUrl = this.router.url;
    this.refreshTeachers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  stringFormatter(str: string): string{
    return str.slice(0).charAt(1).toUpperCase() + str.slice(2).toLowerCase();
  }

  refreshTeachers(): void{
    this.userService.getUsersByRoleName(ROLE.TEACHER).subscribe(data => {
      console.log('Prislo:',data);
      this.teachers = data;
    });
  }

  goCreate(): void{
    this.router.navigate(['/user']);
  }



}
