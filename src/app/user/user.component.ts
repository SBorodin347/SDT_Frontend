import { Component } from '@angular/core';
import {Router} from "@angular/router";

enum NAV {TEACHER, STUDENT,HOME,USERS,SUBJECTS}

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
    if(n === NAV.SUBJECTS)
      this.router.navigate(['/subjects']);
    if(n === NAV.USERS)
      this.router.navigate(['/users']);
    if(n === NAV.HOME)
      this.router.navigate(['/']);
  }


  goBack(): void{
    this.router.navigate(['']);
  }

}
