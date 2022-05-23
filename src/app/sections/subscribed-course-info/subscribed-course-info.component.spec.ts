import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribedCourseInfoComponent } from './subscribed-course-info.component';

describe('SubscribedCourseInfoComponent', () => {
  let component: SubscribedCourseInfoComponent;
  let fixture: ComponentFixture<SubscribedCourseInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribedCourseInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribedCourseInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
