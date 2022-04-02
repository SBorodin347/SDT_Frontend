import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Subject} from "../models/subject.model";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.css']
})
export class SubjectFormComponent {

  @Input()
  set subject(data: Subject){
    if(data){
      this.fillForm(data);
    }
  }

  @Output()
  addSubject = new EventEmitter<Subject>();

  @Output()
  editSubject = new EventEmitter<Subject>();

  form: FormGroup;

  constructor(private router: Router) {
    this.createForm();
  }

  private createForm(): void{
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      hours: new FormControl(null),
      credit: new FormControl(null)
    })
  }

  private fillForm(subject: Subject): void{
    this.form.controls.id.setValue(subject.id);
    this.form.controls.name.setValue(subject.name);
    this.form.controls.hours.setValue(subject.hours);
    this.form.controls.credit.setValue(subject.credit);
  }

  public add(): void{
    if(this.form.valid){
      this.addSubject.emit(this.form.value);
      this.form.reset();
    }
  }

  public edit(): void{
    this.editSubject.emit(this.form.value);
    this.form.reset();
  }

  public remove(): void{
    this.subject = undefined;
    this.form.reset();
  }

  goBack(): void{
    this.router.navigate(['']);
  }

}
