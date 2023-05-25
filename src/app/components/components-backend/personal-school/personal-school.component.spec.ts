import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSchoolComponent } from './personal-school.component';

describe('PersonalSchoolComponent', () => {
  let component: PersonalSchoolComponent;
  let fixture: ComponentFixture<PersonalSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
