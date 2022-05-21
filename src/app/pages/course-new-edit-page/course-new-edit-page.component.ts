import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Course, CoursesList} from "../../models/course.model";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {UserList} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-course-new-edit-page',
  templateUrl: './course-new-edit-page.component.html',
  styleUrls: ['./course-new-edit-page.component.scss']
})
export class CourseNewEditPageComponent implements OnInit {

    constructor(private courseService: CourseService, private activateRoute: ActivatedRoute, public activatedRoute: ActivatedRoute,
              private userService: UserService) {
    this.id = activateRoute.snapshot.params['id'];
    this.createForm();
  }

  @Output()
  addSubject = new EventEmitter<Course>();

  @Output()
  editSubject = new EventEmitter<Course>();

  @Output()
  removeSubject = new EventEmitter<Course>();

  id?: number;
  private subscription: Subscription = new Subscription();
  teachers: UserList[] = [];
  courses: CoursesList[] = [];

  ngOnInit(): void {
    this.refreshTeachers();
    this.refreshCourses();
    if(this.id !== undefined){
      this.subscription.add(this.courseService.getSubject(this.id).subscribe(data => {
        this.fillForm(data);
      }))
    }else{
      this.subscription.add(this.activatedRoute
        .queryParams
        .subscribe(params => {
          this.form.controls.name.setValue(params.name)
          this.form.controls.teacherId.setValue(Number(params.teacherId))
        }));
    }

  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  refreshTeachers(): void{
    this.userService.getUsersByRoleName("ROLE_TEACHER").subscribe(data => {
      this.teachers = data;
    });
  }

  refreshCourses(): void{
    this.courseService.getSubjects().subscribe(data => {
      this.courses = data;
    });
  }

  form: FormGroup;

  private createForm(): void{
     this.form = new FormGroup({
       id: new FormControl(null),
       name: new FormControl(null, [Validators.required]),
       teacherId: new FormControl(null,[Validators.required]),
       hours: new FormControl(null, [Validators.required]),
       credit: new FormControl(null, [Validators.required]),
       status: new FormControl(null, [Validators.required]),
       //isLocked: new FormControl(null)
     })
  }

  private fillForm(course: Course){
    this.form.controls.id.setValue(course.id),
    this.form.controls.name.setValue(course.name),
    this.form.controls.teacherId.setValue(course.teacherId),
    this.form.controls.hours.setValue(course.hours),
    this.form.controls.credit.setValue(course.credit),
    this.form.controls.status.setValue(course.status);
  }

  public add(): void{
    this.addSubject.emit({
      name: this.form.value.name,
      teacherId: this.form.value.teacherId,
      hours: this.form.value.hours,
      credit: this.form.value.credit,
      teacherFirstName: this.form.value.teacherFirstName,
      teacherLastName: this.form.value.teacherLastName,
      status: this.form.value.status,
      creationDate: this.form.value.creationDate,
      lastChangeDate: this.form.value.lastChangeDate,
      isLocked: this.form.value.isLocked
    });
    this.form.reset();
  }

  edit(subject: Course): void{
    if(subject.id !== undefined){
     this.courseService.updateSubject(subject.id, subject).subscribe(data => {
      });
    }
  }

}
