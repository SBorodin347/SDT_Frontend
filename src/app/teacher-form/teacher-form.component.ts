import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Teacher} from "../models/teacher.model";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-teacher-form',
  templateUrl: './teacher-form.component.html',
  styleUrls: ['./teacher-form.component.css']
})
export class TeacherFormComponent {

  @Input()
  set teacher(data: Teacher){
    if(data){
      this.fillForm(data);
    }
  }

  @Output()
  addTeacher = new EventEmitter<Teacher>();

  @Output()
  editTeacher = new EventEmitter<Teacher>();

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

  private fillForm(teacher: Teacher): void{
    this.form.controls.id.setValue(teacher.id);
    this.form.controls.firstName.setValue(teacher.firstName);
    this.form.controls.lastName.setValue(teacher.lastName);
    this.form.controls.password.setValue(teacher.password);
    this.form.controls.phone.setValue(teacher.phone);
    this.form.controls.email.setValue(teacher.email);
    this.form.controls.keyword.setValue(teacher.keyword);
  }

  public add(): void{
    if(this.form.valid){
      this.addTeacher.emit(this.form.value);
      this.form.reset();
    }
  }

  public edit(): void{
    this.editTeacher.emit(this.form.value);
    this.form.reset();
  }

  public remove(): void{
    this.teacher = undefined;
    this.form.reset();
  }

  goBack(): void{
    this.router.navigate(['/users']);
  }

}
