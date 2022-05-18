import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewEditPageComponent } from './user-new-edit-page.component';

describe('UserNewEditPageComponent', () => {
  let component: UserNewEditPageComponent;
  let fixture: ComponentFixture<UserNewEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNewEditPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNewEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
