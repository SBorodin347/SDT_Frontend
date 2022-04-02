import { Component} from '@angular/core';
import {Router} from "@angular/router";

enum NAV {SUBJECTS}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent {

  navig = NAV;

  constructor(private router: Router) { }

  openNav(n : NAV){
    if(n === NAV.SUBJECTS)
      this.router.navigate(['/subjects']);
  }

}
