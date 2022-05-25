import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ROLE, User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";


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

  constructor(private userService: UserService, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.form.controls.roleId.setValue(2); //default radio
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
        id: new FormControl(null, ),
        username: new FormControl(null, [Validators.required]),
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required]),
        passwordHash: new FormControl(null, [Validators.required]),
        roleId: new FormControl(null, [Validators.required]),
      }
    )
  }

  activeRadio: number = 4;
  switchRadio(radio): void{
    this.activeRadio = radio;
  }

  invalid: boolean = false

  add(){
    if(this.form.valid){
      this.invalid = false;
      this.userService.createUser(this.form.value).subscribe();
      if(this.form.controls.roleId.value == 2){
        this.router.navigate(['/referents']).then(()=>{
          window.location.reload();
        })
      }
      if(this.form.controls.roleId.value == 3){
        this.router.navigate(['/teachers']).then(()=>{
          window.location.reload();
        })
      }
      if(this.form.controls.roleId.value == 4){
        this.router.navigate(['/students']).then(()=>{
          window.location.reload();
        })
      }
      this.form.reset();
    }else {
      this.invalid = true;
    }


  }

}

