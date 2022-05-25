import { Component} from '@angular/core';
import {Router} from "@angular/router";
import {NgxPermissionsService} from "ngx-permissions";
import {AuthService} from "../services/authentication/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent {

  constructor() {
  }

  getFirstName(): string{
    return localStorage.getItem('firstName');
  }

}
