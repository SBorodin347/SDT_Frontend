import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

enum NAV {SUBJECTS, USERS,HOME}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  navig = NAV;

  constructor(private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }

  public href: string = "";

  public isActive(s: string){
      if(s == this.href){
        return true;
      }
      else {
        return false;
      }
  }

  openNav(n : NAV){
    if(n === NAV.SUBJECTS)
      this.router.navigate(['/subjects']);
    if(n === NAV.USERS)
      this.router.navigate(['/users']);
    if(n === NAV.HOME)
      this.router.navigate(['/']);
  }

}
