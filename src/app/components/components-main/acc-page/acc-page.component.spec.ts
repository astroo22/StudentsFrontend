import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccPageComponent } from './acc-page.component';

describe('AccPageComponent', () => {
  let component: AccPageComponent;
  let fixture: ComponentFixture<AccPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
