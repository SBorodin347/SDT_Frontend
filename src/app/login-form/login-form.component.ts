import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {LoginPageComponent} from "../login-page/login-page.component";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup

  constructor(private auth: AuthService, private router: Router, public page: LoginPageComponent) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  invalid = false;
  success = false;

  @ViewChild('userNameField') userInput: ElementRef;
  @ViewChild('passNameField') passwordInput: ElementRef;

  public goHome(){
    this.router.navigate(['']);
  }

  focus = false;

  onSubmit() {
    if(this.form.valid) {
      this.auth.login(this.form.value).subscribe(() => {
        this.page.clearWarning();
        this.page.showSuccess();
        setTimeout(this.goHome.bind(this), 2000);
      }, error => {this.page.showWarning(), this.form.controls.password.reset()});
    } else{
      if(this.form.controls.username.value == null){
        this.userInput.nativeElement.focus();
      } else if(this.form.controls.password.value == null){
        this.focus = true;
        this.passwordInput.nativeElement.focus();
      }
    }
  }
}
