import {Component, ElementRef, EventEmitter, Injectable, Output, ViewChild} from '@angular/core';
import {Course, COURSE_STATUS, CoursesList} from "../../models/course.model";
import {CourseService} from "../../services/course/course.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user/user.service";
import {ROLE, UserList} from "../../models/user.model";
import {SubjectListComponent} from "../../tables/course-list/subject-list.component";

enum TAB {TAB1, TAB2,TAB3}

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})

export class CoursePageComponent {

  allCourses: CoursesList[] = []
  approvedCourses: CoursesList[] = []
  refusedCourses: CoursesList[] = []
  teachers: UserList[] = []
  activeSubject?: Course
  popup: boolean = false
  tab: number = 1
  toolbarVisible = false
  ROLE = ROLE;
  public searchString = ''
  private subscription: Subscription = new Subscription()

  constructor(private router: Router, private subjectService: CourseService, private userService: UserService) { }

  ngOnInit(): void{
    this.refreshSubjects();
    this.refreshTeachers();
    this.currentPageUrl = this.router.url;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  @ViewChild(SubjectListComponent)
  childComponentList: SubjectListComponent

  @Output()
  showToolbar(){
    this.toolbarVisible = true;
  }

  @Output()
  hideToolbar(){
    this.toolbarVisible = false;
  }


  public openPDF(): void {

  }

  deleteCourse(){
    if (confirm('Do you really want to delete this?')){
      this.childComponentList.deleteCourses();
      this.childComponentList.showRemovingNotification();
      this.hideToolbar();
    }
  }

  exportCourse(){
    this.childComponentList.openPDF();
    this.childComponentList.uncheck();
    this.hideToolbar();
  }

  public currentPageUrl: string;

  stringFormatter(str: string): string{
    return str.slice(0).charAt(1).toUpperCase() + str.slice(2).toLowerCase();
  }

  switchTab(t: TAB){
    this.tab = t;
  }

  refreshSubjects(): void{
    this.subscription.add(this.subjectService.getSubjects().subscribe(data => {
      this.allCourses = data;
    }));
    this.subscription.add(this.subjectService.getSubjectsByStatus(COURSE_STATUS.REFUSED).subscribe(data => {
      this.refusedCourses = data;
    }));
    this.subscription.add(this.subjectService.getSubjectsByStatus(COURSE_STATUS.APPROVED).subscribe(data => {
      this.approvedCourses = data;
    }));
  }

  refreshTeachers(): void{
    this.subscription.add(this.userService.getUsersByRoleName(ROLE.TEACHER).subscribe(data => {
      this.teachers = data;
    }));
  }

  add(subject: Course): void{
    this.subscription.add(this.subjectService.createSubject(subject).subscribe(data => {
      this.refreshSubjects();
    }));
  }

  edit(subject: Course): void{
    if(subject.id !== undefined){
      this.subscription.add(this.subjectService.updateSubject(subject.id, subject).subscribe(data => {
        this.refreshSubjects();
      }));
    }
  }

  lockCourseById(subjectId: number): void{
    this.subscription.add(this.subjectService.lockSubjectById(subjectId).subscribe(data => {
      this.refreshSubjects();
    }));
  }

  deleteCourseFromList(subjectId: number): void {
      this.subscription.add(this.subjectService.deleteSubject(subjectId).subscribe(data => {
        this.refreshSubjects();
      }));
  }

  public openPopup(){
    this.popup = true;
    document.body.classList.add('overflow-hidden');
  }

  public closePopup(){
    this.activeSubject = null;
    this.popup = false;
    document.body.classList.remove('overflow-hidden');
  }

}
