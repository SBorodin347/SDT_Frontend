import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {StudentService} from "../../student.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup

  constructor(private auth: AuthService, private router: Router, private studentService: StudentService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.auth.login(this.form.value).subscribe(data => {
      this.router.navigate(['home']);
    });

  }
}
