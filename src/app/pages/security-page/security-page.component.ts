import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user/user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/authentication/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-security-page',
  templateUrl: './security-page.component.html',
  styleUrls: ['./security-page.component.scss', './clock.css']
})
export class SecurityPageComponent implements OnInit {

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
  info: boolean = true;
  success: boolean = false;
  errorMessage: string = '';

  private createForm(): void {
    this.form = new FormGroup({
      currentPassword: new FormControl(null, [Validators.required]),
      newPassword: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    })
  }

  private fillForm(user: User): void{
    this.form.controls.newPassword.setValue(user.firstName);
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
}
