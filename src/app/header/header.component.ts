import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import * as myGlobals from '../globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private el: ElementRef) { }

  ngOnInit(): void {}

  getOrganizationTitle(): string{
    return myGlobals.organization_title;
  }

  menu = false
  openMenu(){
    if(!this.menu){
      this.menu = true;
    }else
      this.menu=false;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: Event) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.menu=false;
    }
  }

  logout(){
    localStorage.removeItem('token');
    location.reload();
  }

}
