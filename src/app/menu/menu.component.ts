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

  constructor(private permissionService: NgxPermissionsService, private auth: AuthService, private router: Router) {
  }
  ngOnInit() {
    this.permissionService.loadPermissions(this.auth.getUserRoles());
  }

  public goCourses(){
    this.router.navigate(['/courses']);
  }

  public goSecurity(){
    this.router.navigate(['/security']);
  }

  public goManual(){
    this.router.navigate(['/organization']);
  }


}
