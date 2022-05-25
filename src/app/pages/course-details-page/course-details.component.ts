import {Component, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../services/course/course.service";
import {Course, COURSE_STATUS} from "../../models/course.model";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";
import {SubscriptionModel, SubscriptionModelList} from "../../models/subscriptionModel";
import {ROLE} from "../../models/user.model";
import {SubscriptionsListComponent} from "../../tables/subscriptions-list/subscriptions-list.component";
import {UserListComponent} from "../../user-list/user-list.component";

@Component({
  selector: 'app-course-details-page',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private subjectService: CourseService, private router: Router, private userService: UserService) {
  }

  detailedSubject: Course;
  subscribeInterface: SubscriptionModel;
  subModels: SubscriptionModelList;
  pageSize = 16
  page = 1
  currentPageUrl: string;
  subscriptionCourses: SubscriptionModelList[] = [];
  subscriptionOfCurrentUser: SubscriptionModelList;
  STATUS = COURSE_STATUS;
  ROLE = ROLE;
  isSubscribed: boolean = false;
  toolbarVisible: boolean = false;
  private subscription: Subscription = new Subscription()

  @ViewChild(SubscriptionsListComponent)
  childComponent: SubscriptionsListComponent

  @Output()
  showToolbar(){
    this.toolbarVisible = true;
  }

  @Output()
  hideToolbar(){
    this.toolbarVisible = false;
  }

  @ViewChild(SubscriptionsListComponent)
  childComponentList: SubscriptionsListComponent;

  ngOnInit(): void {
   this.subscription.add(this.activatedRoute.params.subscribe((routerParam) => {
      this.subscribeInterface = new SubscriptionModel(Number(routerParam.id), Number(localStorage.getItem('id')));
      this.subjectService.getSubject(routerParam.id).subscribe(data => {
        this.detailedSubject = data;
        if(this.detailedSubject != undefined && this.detailedSubject.subscribedStudents != null){
          for(let c of this.detailedSubject.subscribedStudents){
            this.subjectService.getSubscription(routerParam.id, c).subscribe(data => {
              this.subscriptionCourses.push(data);
              if(c == this.subscribeInterface.studentId){
                this.subscriptionOfCurrentUser = data;
              }
            })
            if(c == this.subscribeInterface.studentId){
              this.isSubscribed = true;
            }
          }
        }
      });
    }))
    this.currentPageUrl = this.router.url;
  }

  subscribeForCourse() {
    this.subjectService.subscribeForCourse(this.subscribeInterface).subscribe(data => {
      this.subjectService.getSubscription(this.subscribeInterface.subjectId, this.subscribeInterface.studentId).subscribe(data => {
        this.subscriptionCourses.push(data);
        this.subscriptionOfCurrentUser = data;
      })
    })
    this.isSubscribed = true;
  }

  unsubscribeFromCourse() {
    if(confirm('Do you really want to unsubscribe from the course?')){
      this.subjectService.unsubscribeFromCourse(this.subscribeInterface).subscribe();
      this.subscriptionCourses = this.subscriptionCourses.filter(n => n.studentId != this.subscribeInterface.studentId);
      this.isSubscribed = false;
    }
  }

  removeStudent(): void{
    if(confirm('Do you really want to remove a student from the list?')){
      this.childComponent.deleteFromCourse();
      this.hideToolbar();
    }
  }

  deleteStudentFromCourse(model: SubscriptionModel): void{
      this.subjectService.unsubscribeFromCourse(model).subscribe();
      this.subscriptionCourses = this.subscriptionCourses.filter(n => n.studentId != model.studentId)
  }

  exportStudents(){
    this.childComponentList.openPDF();
    this.childComponentList.uncheck();
    this.hideToolbar();
  }

  public countOfPages(): number{
    return Math.ceil(this.subscriptionCourses.length / this.pageSize);
  }

  public badge(status: COURSE_STATUS){
    if(status == COURSE_STATUS.APPROVED){
      return 'badge-approve'
    }
    if(status == COURSE_STATUS.REFUSED){
      return 'badge-refuse'
    }
    if(status == COURSE_STATUS.CANCELLED){
      return 'badge-cancel'
    }
  }



  tab = 1;

  switchTab(t: number){
    this.tab = t;
  }

  subjectStatus = COURSE_STATUS;
  public goHome(){
    this.router.navigate(['/']);
  }

  public goCourses(){
    this.router.navigate(['/courses']);
  }

  public editSubject(){
    this.router.navigate(['/course']);
  }

  capitalString(str: string){
    if(str != null){
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  }


}
