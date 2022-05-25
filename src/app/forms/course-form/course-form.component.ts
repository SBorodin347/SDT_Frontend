import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Course, CoursesList} from "../../models/course.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserList} from "../../models/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {

  form: FormGroup;
  startedCourse: Course;
  selected;

  @Output()
  closePopup = new EventEmitter<any>();

  public closeModal() {
    this.closePopup.emit();
  }

  @Input()
  courses: CoursesList[] = [];

  @Input()
  teachers = [];

  @Output()
  addCourse = new EventEmitter<Course>();

  @Output()
  editCourse = new EventEmitter<Course>();


  constructor(private router: Router) {
    this.createForm();
  }

  private createForm(): void{
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      teacherId: new FormControl(null, [Validators.required]),
    })
  }

  invalid: boolean = false;

  public add(): void{
    if(this.form.valid){
      this.invalid = false;
      this.startedCourse = this.form.value;
      this.router.navigate(['/course'],  { queryParams: { name: this.startedCourse.name,
          teacherId: this.startedCourse.teacherId } });
      document.body.classList.remove('overflow-hidden');
    } else {
      this.invalid = true;
    }
  }


}
