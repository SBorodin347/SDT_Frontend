import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {User, UserList} from "../models/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  users: UserList[] = [];
  user: User;

  @Output()
  editUser: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  removeUser: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
  }

  edit(userId: number): void{
    this.editUser.emit(userId);
  }

  remove(userId: number): void{
    this.removeUser.emit(userId);
  }

  isChecked = false;
  checkedBox(){
    if(!this.isChecked){
      this.isChecked = true;
    }else{
      this.isChecked = false;
    }
  }

  check(id: number){
    let checkbox = document.getElementById(id.toString());
    checkbox.classList.toggle('selected-row');
  }

  selectedRow(){
    if(this.isChecked){
      return 'selected-row';
    }
  }

}
