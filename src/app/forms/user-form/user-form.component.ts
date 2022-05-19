import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup} from "@angular/forms";
import {ROLE, User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  private subscription: Subscription = new Subscription();
  numberOfAdmins: number;
  numberOfTeachers: number;
  numberOfStudents: number;
  numberOfReferents: number;
  ROLE = ROLE;

  constructor(private userService: UserService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.form.controls.roleId.setValue(1); //default radio
    this.subscription.add(this.userService.getUsersByRoleName(ROLE.ADMIN).subscribe(data=>{
        this.numberOfAdmins = data.length;
    }));
    this.subscription.add(this.userService.getUsersByRoleName(ROLE.TEACHER).subscribe(data=>{
      this.numberOfTeachers = data.length;
    }));
    this.subscription.add(this.userService.getUsersByRoleName(ROLE.STUDENT).subscribe(data=>{
      this.numberOfStudents = data.length;
    }));
    this.subscription.add(this.userService.getUsersByRoleName(ROLE.REFERENT).subscribe(data=>{
      this.numberOfReferents = data.length;
    }));
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  form: FormGroup

  public createForm(){
    this.form = new FormGroup({
        id: new FormControl(null),
        username: new FormControl(null),
        firstName: new FormControl(null),
        lastName: new FormControl(null),
        email: new FormControl(null),
        phone: new FormControl(null),
        passwordHash: new FormControl(null),
        roleId: new FormControl(null),
      }
    )
  }

  activeRadio: number = 1;
  switchRadio(radio): void{
    this.activeRadio = radio;
  }

  add(){
    if(this.form.valid){
      this.userService.createUser(this.form.value).subscribe();
    }
    this.form.reset();
  }

}

