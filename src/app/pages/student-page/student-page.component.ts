import {Component, ElementRef, Output, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {ROLE, User, UserList} from "../../models/user.model";
import {Subscription} from "rxjs";
import {UserListComponent} from "../../user-list/user-list.component";

@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss']
})
export class StudentPageComponent {

  students: UserList[] = [];
  public currentPageUrl: string;
  public searchString = '';
  toolbarVisible = false

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void{
    this.currentPageUrl = this.router.url;
    this.refreshStudents();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @ViewChild(UserListComponent)
  childComponentList: UserListComponent;

  @Output()
  showToolbar(){
    this.toolbarVisible = true;
  }

  @Output()
  hideToolbar(){
    this.toolbarVisible = false;
  }

  @ViewChild('htmlData') htmlData:ElementRef;

  public openPDF(): void {

  }

  deleteUser(){
    if (confirm('Do you really want to delete this?')){
      this.childComponentList.deleteUsers();
      this.childComponentList.showRemovingNotification();
      this.hideToolbar();
    }
  }

  exportUser(){
    this.childComponentList.openPDF();
    this.childComponentList.uncheck();
    this.hideToolbar();
  }

  stringFormatter(str: string): string{
    return str.slice(0).charAt(1).toUpperCase() + str.slice(2).toLowerCase();
  }

  refreshStudents(): void{
    this.userService.getUsersByRoleName(ROLE.STUDENT).subscribe(data => {
      console.log('Prislo:',data);
      this.students = data;
    });
  }

  add(student: User): void{
    this.userService.createUser(student).subscribe(data => {
      this.refreshStudents();
    });
  }

  deleteStudentFromList(studentId: number): void {
    this.subscription.add(this.userService.deleteUser(studentId).subscribe(data => {
      this.refreshStudents();
    }));
  }

  addStudentQuery(): void{
    this.router.navigate(['/user'], {queryParams: {type: 'student'}});
  }

}
