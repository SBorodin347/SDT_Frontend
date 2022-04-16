import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Subject, SubjectList} from "../models/subject.model";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {SubjectSiteComponent} from "../subject-site/subject-site.component";
import {Teacher} from "../models/teacher.model";

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent {

  @Input()
  set subject(data: Subject){
    if(data){
      this.fillForm(data);
    }
  }

  @Input()
  subjects: SubjectList[] = [];

  @Input()
  teachers: Teacher[] = []

  @Output()
  addSubject = new EventEmitter<Subject>();

  @Output()
  editSubject = new EventEmitter<Subject>();

  form: FormGroup;

  constructor(private router: Router, public componentOne: SubjectSiteComponent) {
    this.createForm();
  }

  closePopup(): void{
    this.componentOne.closePopup();
  }

  private createForm(): void{
    this.form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      teacherId: new FormControl(null, [Validators.required]),
      hours: new FormControl(null, [Validators.required]),
      credit: new FormControl(null, [Validators.max(30), Validators.required])
    })
  }

  private fillForm(subject: Subject): void{
    this.form.controls.id.setValue(subject.id);
    this.form.controls.name.setValue(subject.name);
    this.form.controls.teacherId.setValue(subject.teacherId);
    this.form.controls.hours.setValue(subject.hours);
    this.form.controls.credit.setValue(subject.credit);
  }

  public add(): void{
    if(this.form.valid){
      this.addSubject.emit(this.form.value);
      this.form.reset();
    }
    setTimeout(function () {
      location.reload();
    }, 0);
  }

  public edit(): void{
    this.editSubject.emit(this.form.value);
    this.form.reset();
    setTimeout(function () {
      location.reload();
    }, 0);
  }

  public remove(): void{
    this.subject = undefined;
    this.form.reset();
  }

  goBack(): void{
    this.router.navigate(['/']);
  }

}
