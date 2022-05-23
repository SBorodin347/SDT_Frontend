import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {SubscriptionModelList} from "../../models/subscriptionModel";

@Component({
  selector: 'app-subscribed-course-info',
  templateUrl: './subscribed-course-info.component.html',
  styleUrls: ['./subscribed-course-info.component.scss']
})
export class SubscribedCourseInfoComponent implements OnInit {

  constructor(private courseService: CourseService) { }


  currentUser: SubscriptionModelList

  @Input()
  set currentSub(data: SubscriptionModelList){
    if(data) {
      this.currentUser = data;
    }
  }

  ngOnInit(): void {

  }

}
