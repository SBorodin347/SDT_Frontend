import { Component, OnInit } from '@angular/core';
import * as myGlobals from '../../globals';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  getOrganizationTitle(): string{
    return myGlobals.organization_title;
  }

  warning = false;
  success = false;

  showWarning(){
    this.warning = true;
  }

  clearWarning(){
    this.warning = false;
  }

  showSuccess(){
    this.success = true;
  }

  ngOnInit(): void {
  }
}
