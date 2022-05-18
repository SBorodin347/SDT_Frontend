import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CourseService} from "../../services/course/course.service";
import {Course, COURSE_STATUS} from "../../models/course.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-course-details-page',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private subjectService: CourseService, private router: Router) {
    this.createForm();
  }

  detailedSubject: Course;
  currentPageUrl: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((routerParam) => {
      this.subjectService.getSubject(routerParam.id).subscribe(data => {
        this.detailedSubject = data;
        this.fillForm(data);
      });
    })
    this.currentPageUrl = this.router.url;
  }

  form: FormGroup;

  private createForm(): void{
    this.form = new FormGroup({
      hours: new FormControl(null, [Validators.required]),
      credit: new FormControl(null, [Validators.max(30), Validators.required]),
    })
  }

  private fillForm(subject: Course): void{
    this.form.controls.hours.setValue(subject.hours);
    this.form.controls.credit.setValue(subject.credit);
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

}
