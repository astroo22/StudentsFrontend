import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalCreateSchoolComponent } from './personal-create-school.component';

describe('PersonalCreateSchoolComponent', () => {
  let component: PersonalCreateSchoolComponent;
  let fixture: ComponentFixture<PersonalCreateSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalCreateSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalCreateSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
