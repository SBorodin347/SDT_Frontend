import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferentPageComponent } from './referent-page.component';

describe('ReferentPageComponent', () => {
  let component: ReferentPageComponent;
  let fixture: ComponentFixture<ReferentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferentPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
