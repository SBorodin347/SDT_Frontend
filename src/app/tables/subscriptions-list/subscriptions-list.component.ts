import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SubscriptionModel, SubscriptionModelList} from "../../models/subscriptionModel";

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.scss']
})
export class SubscriptionsListComponent implements OnInit {

  deletedList = []
  deleteModel: SubscriptionModel
  sortByStudentLastName: boolean = false
  sortByDateVisible: boolean = false
  sortByNameType: string = ''
  sortByDateType: string = ''

  @Output()
  openSettings: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  closeSettings: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  removeSubscription: EventEmitter<SubscriptionModel> = new EventEmitter<SubscriptionModel>();

  @Input()
  subscriptions: SubscriptionModelList[] = [];

  constructor() { }

  ngOnInit(): void {
    this.subscriptions.map(((item, index)=> {
      this.subscriptions.push(Object.assign({},item,{select: false}))
    }))
  }

  deleteFromCourse(){
    this.deletedList = this.subscriptions.filter(function(course) {
      return course.select;
    });
    for(const c of this.deletedList){
      this.deleteModel = new SubscriptionModel(c.subjectId, c.studentId);
      this.removeSubscription.emit(this.deleteModel);
    }
    this.uncheck();
  }

  capitalString(str: string){
    if(str != null){
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  }

  parentSelector: boolean = false

  public uncheck(){
    for(const c of this.subscriptions){
      c.select = false;
    }
    this.parentSelector = false;
  }

  onChange($event){
    const id = $event.target.value;
    const isChecked = $event.target.checked;
    this.openSettings.emit();
    this.subscriptions = this.subscriptions.map((d) => {
      if(d.studentId == id){
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
    if(this.subscriptions.every(course => course.select == false || course.select == undefined)){
      this.closeSettings.emit();
    }
  }

  public showNameSorting(): void{
    this.sortByStudentLastName = !this.sortByStudentLastName;
  }

  public showDateSorting(): void{
    this.sortByDateVisible = !this.sortByDateVisible;
  }

  resetSorts(): void{
    this.sortByNameType = this.sortByDateType = '';
  }

  public sortByStudentAsc(): void{
    this.resetSorts();
    this.sortByStudentLastName = false;
    this.sortByNameType = 'asc';
    this.subscriptions.sort(function(a,b){
      return a.studentLastName.localeCompare(b.studentLastName);
    })
  }
  public sortByStudentDesc(): void{
    this.resetSorts();
    this.sortByStudentLastName = false;
    this.sortByNameType = 'desc';
    this.subscriptions.sort(function(a,b){
      return b.studentLastName.localeCompare(a.studentLastName);
    })
  }

  public sortByDateAsc(): void {
    this.resetSorts();
    this.sortByDateVisible = false;
    this.sortByDateType = 'asc';
    this.subscriptions.sort((a, b) => {
      return new Date(a.dateOfRegistration).getDate() - new Date(b.dateOfRegistration).getDate();
    })
  }
  public sortByDateDesc(): void {
    this.resetSorts();
    this.sortByDateVisible = false;
    this.sortByDateType = 'desc';
    this.subscriptions.sort((a, b) => {
      return new Date(b.dateOfRegistration).getDate() - new Date(a.dateOfRegistration).getDate();
    })
  }



}
