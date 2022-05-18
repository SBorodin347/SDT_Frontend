import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNewEditPageComponent } from './course-new-edit-page.component';

describe('CourseNewEditPageComponent', () => {
  let component: CourseNewEditPageComponent;
  let fixture: ComponentFixture<CourseNewEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseNewEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNewEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
