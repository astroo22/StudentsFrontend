import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSchoolDataBoxComponent } from './personal-school-data-box.component';

describe('PersonalSchoolDataBoxComponent', () => {
  let component: PersonalSchoolDataBoxComponent;
  let fixture: ComponentFixture<PersonalSchoolDataBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalSchoolDataBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalSchoolDataBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
