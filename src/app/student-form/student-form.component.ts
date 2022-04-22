import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Student} from "../models/student.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginFormComponent} from "../login-form/login-form.component";
import {LoginPageComponent} from "../login-page/login-page.component";

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent {

  @Input()
  set student(data: Student){
    if(data){
      this.fillForm(data);
    }
  }

  @Output()
  addStudent = new EventEmitter<Student>();

  @Output()
  editStudent = new EventEmitter<Student>();

  form: FormGroup;

  constructor(private router: Router) {
    this.createForm();
  }

  private createForm(): void{
    this.form = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      password: new FormControl(null),
      phone: new FormControl(null),
      email: new FormControl(null),
      keyword: new FormControl(null)
    })
  }

  private fillForm(student: Student): void{
    this.form.controls.id.setValue(student.id);
    this.form.controls.firstName.setValue(student.firstName);
    this.form.controls.lastName.setValue(student.lastName);
    this.form.controls.password.setValue(student.password);
    this.form.controls.phone.setValue(student.phone);
    this.form.controls.email.setValue(student.email);
    this.form.controls.keyword.setValue(student.keyword);
  }

  public add(): void{
    if(this.form.valid){
      this.addStudent.emit(this.form.value);
      this.form.reset();
    }
  }

  public edit(): void{
    this.editStudent.emit(this.form.value);
    this.form.reset();
  }

  public remove(): void{
    this.student = undefined;
    this.form.reset();
  }

  goBack(): void{
    this.router.navigate(['/users']);
  }

}
