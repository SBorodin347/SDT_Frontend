import { Component } from '@angular/core';
import {Router} from "@angular/router";

enum NAV {TEACHER, STUDENT}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent{

  navig = NAV;

  constructor(private router: Router) { }

  openNav(n : NAV){
    if(n === NAV.TEACHER)
      this.router.navigate(['/teacher']);
    if(n === NAV.STUDENT)
      this.router.navigate(['/student']);
  }

  goBack(): void{
    this.router.navigate(['']);
  }

}
