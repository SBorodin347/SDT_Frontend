import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";
import {AuthService} from "../../services/authentication/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private auth: AuthService) {
    this.userService.getUserByUserId(auth.getUserId()).subscribe(data=>{
      this.fillForm(data);
    })
    this.createForm();
  }
  ngOnInit(): void {
  }

  form: FormGroup;
  incorrectPassword: boolean = false;
  incorrectFirstName: boolean = false;
  info: boolean = true;
  success: boolean = false;
  errorMessage: string = '';

  private createForm(): void {
    this.form = new FormGroup({
      newPassword1: new FormControl(null, [Validators.required]),
      newPassword2: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    })
  }

  private fillForm(user: User): void{
    this.form.controls.firstName.setValue(user.firstName);
    this.form.controls.lastName.setValue(user.lastName);
    this.form.controls.email.setValue(user.email);
    this.form.controls.phone.setValue(user.phone);
  }


  changePassword(): void{
    if(this.form.valid){
      this.userService.updatePassword(this.auth.getUserId(), this.form.value).subscribe(success => {
          this.info = false;
          this.incorrectPassword = false;
          this.success = true;
          this.form.reset();
        }, error => {
          if(error.status == 444){
            this.info = false;
            this.errorMessage = error.error;
            this.incorrectPassword = true;
          }
        }
      );
    }
  }

  saveData() {
    this.changePassword();
  }
}

