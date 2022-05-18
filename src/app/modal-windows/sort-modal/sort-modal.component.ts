import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-sort-modal',
  templateUrl: './sort-modal.component.html',
  styleUrls: ['./sort-modal.component.scss']
})
export class SortModalComponent{

  constructor() { }

  @Output()
  sortByAsc = new EventEmitter<void>();

  @Output()
  sortByDesc = new EventEmitter<void>();

  @Input()
  sortType: string;

}
