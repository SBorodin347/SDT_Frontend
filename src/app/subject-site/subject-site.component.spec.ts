import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSiteComponent } from './subject-site.component';

describe('SubjectSiteComponent', () => {
  let component: SubjectSiteComponent;
  let fixture: ComponentFixture<SubjectSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
