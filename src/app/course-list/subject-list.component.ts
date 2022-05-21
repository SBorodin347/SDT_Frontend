import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {COURSE_STATUS, CoursesList} from "../models/course.model";
import {CoursePageComponent} from "../pages/course-page/course-page.component";
import {Router} from "@angular/router";
import jsPDF, {CellConfig} from 'jspdf';
import html2canvas from 'html2canvas';
import {getLocaleDateTimeFormat} from "@angular/common";

@Component({
  selector: 'app-course-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.scss']
})

export class SubjectListComponent implements OnInit{

  constructor(public componentOne: CoursePageComponent, private router: Router){
  };

  ngOnInit(){
    this.courses.map(((item, index)=> {
      this.courses.push(Object.assign({},item,{select: false}))
    }))
  }

  sortByNameVisible: boolean = false
  sortByTeacherVisible: boolean = false
  sortByDateVisible: boolean = false
  sortByNameType: string = ''
  sortByTeacherType: string = ''
  sortByDateType: string = ''
  reset = false
  pageSize = 16
  page = 1
  list = []
  deletedList = []
  lockedList = []
  exportedCourses = []
  notificationRemoving = false
  column1 = true
  parentSelector: boolean = false

  @Input()
  searchString;


  @Input()
  courses: CoursesList[] = [];

  @Output()
  lockCourse: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  openSettings: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  closeSettings: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeCourse: EventEmitter<number> = new EventEmitter<number>();

  public countOfPages(): number{
    return Math.ceil(this.courses.length / this.pageSize);
  }

  public courseWordFormatter(): string{
    if(this.deletedList?.length==1){
      return "course";
    }else return "courses";
  }


  private static _createHeadersForPdfTable(keys: string[]) {
    const result: CellConfig[] = [];
    for (let i = 0; i < keys.length; i += 1) {
      result.push({
        name: keys[i],
        prompt: keys[i],
        width: 42,
        align: 'center',
        padding: 8
      });
    }
    return result;
  }

  private _getDataForPdfTable() {
    const data = [];
    this.exportedCourses = this.courses.filter(function(course) {
      return course.select == true;
    });
    for (let i = 0; i < this.exportedCourses.length; i++) {
      data.push({
        Title: this.exportedCourses[i].name,
        First: this.exportedCourses[i].teacherFirstName,
        Last: this.exportedCourses[i].teacherLastName,
        Creation: this.exportedCourses[i].creationDate,
        Hours: this.exportedCourses[i].hours.toString(),
        Credits: this.exportedCourses[i].credit.toString(),
      });
    }
    return data;
  }

  public openPDF(): void {
    const fileName = 'ExportedCourses';
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.text('Exported courses', 10, 20);
    doc.table(10, 35, this._getDataForPdfTable(), SubjectListComponent._createHeadersForPdfTable([
      'Title', 'First', 'Last', 'Creation', 'Hours', 'Credits'
    ]), { autoSize: false });
    doc.save(fileName);
  }

  public deleteCourses(){
    this.deletedList = this.courses.filter(function(course) {
      return course.select == true;
    });
    for(const c of this.deletedList){
       this.removeCourse.emit(c.id);
    }
  }

  public lockCourses(){
    this.lockedList = this.courses.filter(function(course) {
      return course.select == true;
    });
    for(const c of this.lockedList){
      this.lockCourse.emit(c.id);
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

  openDetailsOfSubject(id: number){
    this.router.navigate(['/courses/'+id]);
  }

  showRemovingNotification(){
    this.notificationRemoving = true;
    setTimeout(()=>{
      this.notificationRemoving = false;
    }, 2000)
  }


  public uncheck(){
    for(const c of this.courses){
      c.select = false;
    }
    this.parentSelector = false;
  }

  onChange($event){
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    this.openSettings.emit();
    this.courses = this.courses.map((d) => {
      if(d.id == id){
        d.select = isChecked;
        this.parentSelector = false;
        return d;
      }
      if(id == -1){
        d.select = this.parentSelector;
        return d;
      }
      return d;
    });
    if(this.courses.every(course => course.select == false || course.select == undefined)){
      this.closeSettings.emit();
    }
  }
}

