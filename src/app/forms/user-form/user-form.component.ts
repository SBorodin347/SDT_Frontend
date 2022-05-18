import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  constructor(private userService: UserService) {
    this.createForm();
  }


  ngOnInit(): void {
    this.form.controls.roleId.setValue(1);
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
      this.userService.createUser(this.form.value).subscribe(data => {
        console.log(data);
      })
    }
    this.form.reset();
  }

}

