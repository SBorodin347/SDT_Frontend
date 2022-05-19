import { Component, OnInit } from '@angular/core';
import {ROLE, User, UserList} from "../../models/user.model";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-referent-page',
  templateUrl: './referent-page.component.html',
  styleUrls: ['./referent-page.component.scss']
})
export class ReferentPageComponent implements OnInit {

  referents: UserList[] = [];
  activeReferent?: User;

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void{
    this.currentPageUrl = this.router.url;
    this.refreshReferent();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public currentPageUrl: string;
  stringFormatter(str: string): string{
    return str.slice(0).charAt(1).toUpperCase() + str.slice(2).toLowerCase();
  }

  refreshReferent(): void{
    this.userService.getUsersByRoleName(ROLE.STUDENT).subscribe(data => {
      this.referents = data;
    });
  }

  goCreate(): void{
    this.router.navigate(['/user']);
  }

}
