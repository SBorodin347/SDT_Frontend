import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from "../../services/course/course.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Course, COURSE_LANGUAGE, COURSE_SEMESTER, COURSE_STATUS, COURSE_TYPE} from "../../models/course.model";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserList} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";
import {ClipboardService} from "ngx-clipboard";

@Component({
  selector: 'app-course-new-edit-page',
  templateUrl: './course-new-edit-page.component.html',
  styleUrls: ['./course-new-edit-page.component.scss']
})
export class CourseNewEditPageComponent implements OnInit {

    constructor(private courseService: CourseService, public activatedRoute: ActivatedRoute,
              private userService: UserService, private clipboardApi: ClipboardService, private router: Router) {
    this.id = activatedRoute.snapshot.params['id'];
    this.createForm();
  }

  id?: number;
  newCourse: boolean = undefined;
  editCourse: boolean = undefined;
  STATUS = COURSE_STATUS;
  TYPE = COURSE_TYPE;
  LANGUAGE = COURSE_LANGUAGE;
  SEMESTER = COURSE_SEMESTER;
  private subscription: Subscription = new Subscription();
  teachers: UserList[] = [];
  courseCode: string;

  getContext(): string{
    if(this.editCourse){
      return "Edit";
    }else{
      return "New";
    }
  }

  indexOf(c){
    for(var i= 0, l = c.length; i<l; i++){
      if(c[i] == ' '){
        return i+1;
      }
    }
    return -1;
  }

  isGenerated: boolean = false;

  generateCourseCode(){
    let c = this.form.controls.name.value;
    let ind = this.indexOf(c);
    if(ind!= -1){
      this.courseCode = c.slice(0,1).toUpperCase() + c.slice(1,2).toLowerCase() +
        c.slice(ind, ind+1).toUpperCase() +
        c.slice(ind+1, ind+2).toLowerCase() + "-" + Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
    }else{
      this.courseCode = c.slice(0,1).toUpperCase() + c.slice(1,4).toLowerCase() + "-" + Math.floor(Math.random() * (10000 - 10 + 1)) + 10;
    }
    this.form.controls.subjectCode.setValue(this.courseCode);
    this.isGenerated = true;
  }

  ngOnInit(): void {
    this.refreshTeachers();
    if(this.id !== undefined){
      this.subscription.add(this.courseService.getSubject(this.id).subscribe(data => {
        this.fillForm(data);
      }))
      this.editCourse = true;
      this.form.controls.subjectCode.disable();
    }else{
      this.subscription.add(this.activatedRoute
        .queryParams
        .subscribe(params => {
          this.form.controls.name.setValue(params.name)
          this.form.controls.teacherId.setValue(Number(params.teacherId))
        }));
      this.form.controls.accessible.setValue(true);
      this.newCourse = true;
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

  copyText() {
    this.clipboardApi.copyFromContent(this.form.controls.subjectCode.value);
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
       subjectType: new FormControl(null, [Validators.required]),
       abbreviation: new FormControl(null, [Validators.required]),
       subjectCode: new FormControl(null, [Validators.required]),
       semester: new FormControl(null, [Validators.required]),
       language: new FormControl(null, [Validators.required]),
       accessible: new FormControl(null)
     })
  }

  private fillForm(course: Course){
    this.form.controls.id.setValue(course.id),
    this.form.controls.name.setValue(course.name),
    this.form.controls.teacherId.setValue(course.teacherId),
    this.form.controls.hours.setValue(course.hours),
    this.form.controls.credit.setValue(course.credit),
    this.form.controls.status.setValue(course.status),
    this.form.controls.subjectType.setValue(course.subjectType),
    this.form.controls.subjectCode.setValue(course.subjectCode),
    this.form.controls.semester.setValue(course.semester),
    this.form.controls.language.setValue(course.language),
    this.form.controls.abbreviation.setValue(course.abbreviation),
    this.form.controls.accessible.setValue(course.accessible)
  }

  edit(subject: Course): void{
    if(this.editCourse){
     this.courseService.updateSubject(subject.id, subject).subscribe(data => {
      });
    }
  }

  createCourse(): void{
    if(this.form.valid){
      if(this.newCourse){
        this.courseService.createSubject(this.form.value).subscribe();
      }
      this.router.navigate(['/courses'],  { queryParams: { creationState: true} });
    }
  }


  updateCourse(): void{
    if(this.form.valid){
      if(this.editCourse){
        this.courseService.updateSubject(this.id, this.form.value).subscribe();
      }
      this.router.navigate(['/courses'],  { queryParams: { editionState: true} });
    }
  }

  deleteCourse(): void{
    if(confirm('Do you really want to delete this?')){
      this.subscription.add(this.courseService.getSubject(this.id).subscribe(data => {
        if(data.subscribedStudents.length >= 1){
          alert('This course cannot be deleted while students are subscribed to it');
        }else{
          this.courseService.deleteSubject(this.id).subscribe();
          this.router.navigate(['/courses'],  { queryParams: { removingState: true} });
        }
      }))
    }
  }

  onChangeToggle($event){
    const isChecked = $event.target.checked;
    if(isChecked){
      this.form.controls.accessible.setValue(true);
    }else{
      this.form.controls.accessible.setValue(false);
    }
  }

}
