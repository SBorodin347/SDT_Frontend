import {Component, ElementRef, HostListener, Injectable, OnInit} from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {User} from "../../models/user.model";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private el: ElementRef, private auth: AuthService, private userService: UserService) { }

  public user: User;

  ngOnInit(): void {
    this.userService.getUserByUserId(this.auth.getUserId()).subscribe(data => {
      this.user = data;
    })
  }

  userProfilePic(): string{
    return this.user.firstName.charAt(0) + this.user.lastName.charAt(0);
  }

  public menu: boolean = false;
  openMenu(){
    this.menu = !this.menu;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.menu=false;
    }
  }

  public logout(): void{
    this.auth.logout();
  }


}
