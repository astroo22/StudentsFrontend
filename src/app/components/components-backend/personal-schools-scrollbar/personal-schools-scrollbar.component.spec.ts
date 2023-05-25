import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalSchoolsScrollbarComponent } from './personal-schools-scrollbar.component';

describe('PersonalSchoolsScrollbarComponent', () => {
  let component: PersonalSchoolsScrollbarComponent;
  let fixture: ComponentFixture<PersonalSchoolsScrollbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalSchoolsScrollbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalSchoolsScrollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
