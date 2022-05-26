import {Component, OnInit} from '@angular/core';
import {NgxPermissionsService} from "ngx-permissions";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./services/authentication/auth.service";
import {ROLE} from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Educk';


  constructor(private permissionService: NgxPermissionsService, private auth: AuthService) {
  }
  ngOnInit() {


    this.permissionService.loadPermissions(this.auth.getUserRoles());

  }
}
