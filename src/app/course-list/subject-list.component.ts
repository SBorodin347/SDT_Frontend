import {Component, EventEmitter, Input, Output} from '@angular/core';
import {COURSE_STATUS, CoursesList} from "../models/course.model";
import {CoursePageComponent} from "../pages/course-page/course-page.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})

export class SubjectListComponent {

  constructor(public componentOne: CoursePageComponent, private router: Router){};

  sortByNameVisible: boolean = false;
  sortByTeacherVisible: boolean = false;
  sortByDateVisible: boolean = false;
  sortByNameType: string = '';
  sortByTeacherType: string = '';
  sortByDateType: string = '';
  reset = false;
  pageSize = 16;
  page = 1;

  @Input()
  searchString;

  @Input()
  courses: CoursesList[] = [];

  @Output()
  editCourse: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  removeCourse: EventEmitter<number> = new EventEmitter<number>();

  public avatarColor(char: string){
    let c = char.charAt(0).toUpperCase();
    if(c == 'A' || c == 'B' || c == 'D' || c == 'E' || c == 'F' || c == 'G'){
      return '#F98E54';
    }
    if(c == 'H' || c == 'V' || c == 'I' || c == 'J' || c == 'K' || c == 'L'){
      return '#92A4EF';
    }
    if(c == 'M' || c == 'N' || c == 'N' || c == 'O' || c == 'P' || c == 'Q'){
      return '#57C27D';
    }
    if(c == 'R' || c == 'S' || c == 'T' || c == 'U' || c == 'V' || c == 'W'){
      return '#8AC4E5';
    }
  }

  public badge(status: COURSE_STATUS){
    if(status == COURSE_STATUS.APPROVED){
      return 'badge-approve'
    }
    if(status == COURSE_STATUS.REFUSED){
      return 'badge-refuse'
    }
    if(status == COURSE_STATUS.CANCELLED){
      return 'badge-cancel'
    }
  }

   isChecked = false;
   checkedBox(){
     if(!this.isChecked){
       this.isChecked = true;
     }else{
       this.isChecked = false;
     }
   }

  column1 = true;
  public hideColumn1(){
    this.column1 = !this.column1;
  }

  resetSorts(): void{
    this.sortByNameType = this.sortByTeacherType = this.sortByDateType = '';
  }

  public sortByNameAsc(): void{
    this.resetSorts();
    this.sortByNameVisible = false;
    this.sortByNameType = 'asc';
    this.courses.sort(function(a,b){
      return a.name.localeCompare(b.name);
    })
  }
  public sortByNameDesc(): void{
    this.resetSorts();
    this.sortByNameVisible = false;
    this.sortByNameType = 'desc';
    this.courses.sort(function(a,b){
      return b.name.localeCompare(a.name);
    })
  }

  public sortByTeacherAsc(): void{
    this.resetSorts();
    this.sortByTeacherVisible = false;
    this.sortByTeacherType = 'asc';
    this.courses.sort(function(a,b){
      return a.teacherLastName.localeCompare(b.teacherLastName);
    })
  }
  public sortByTeacherDesc(): void{
    this.resetSorts();
    this.sortByTeacherVisible = false;
    this.sortByTeacherType = 'desc';
    this.courses.sort(function(a,b){
      return b.teacherLastName.localeCompare(a.teacherLastName);
    })
  }
  public sortByDateAsc(): void {
    this.resetSorts();
    this.sortByDateVisible = false;
    this.sortByDateType = 'asc';
    this.courses.sort((a, b) => {
      return Date.parse(a.creationDate) - Date.parse(b.creationDate);
    })
  }
  public sortByDateDesc(): void {
    this.resetSorts();
    this.sortByDateVisible = false;
    this.sortByDateType = 'desc';
    this.courses.sort((a, b) => {
      return Date.parse(b.creationDate) - Date.parse(a.creationDate);
    })
  }

  public showNameSorting(): void{
    this.sortByNameVisible = !this.sortByNameVisible;
  }

  public showTeacherSorting(): void{
    this.sortByTeacherVisible = !this.sortByTeacherVisible;
  }

  public showDateSorting(): void{
    this.sortByDateVisible = !this.sortByDateVisible;
  }

  capitalString(str: string){
    if(str != null){
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  }

  firstChar(str: string){
    return str.charAt(0);
  }

  edit(subjectId: number): void{
    this.editCourse.emit(subjectId);
  }

  remove(subjectId: number): void{
    this.removeCourse.emit(subjectId);
  }

  openDetailsOfSubject(id: number){
    this.router.navigate(['/courses/'+id]);
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

  public goToEditSubject(id: any){
    this.router.navigate(['/courses/edit/', id]);
  }

}

