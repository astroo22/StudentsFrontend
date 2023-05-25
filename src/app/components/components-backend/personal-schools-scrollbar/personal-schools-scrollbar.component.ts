import { Component,SimpleChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-personal-schools-scrollbar',
  templateUrl: './personal-schools-scrollbar.component.html',
  styleUrls: ['./personal-schools-scrollbar.component.scss']
})
export class PersonalSchoolsScrollbarComponent {
  @Output() selectedSchoolChange = new EventEmitter<School>();
  selectedSchool: School;
  schools: School[];

  // flag for later use can be renamed
  alertUserToMakeSchool: boolean;

  // config for testing
  owner: User = {owner_id: 'The New Vibe',
                user_name: 'pls stahp 2023',
                email: 'roughyear@life.com',
                hashed_password: '',
                school_list: []};

 

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.owner.owner_id = "The New Vibe"
    this.getAllSchools();
  }

  getAllSchools(){
    this.schoolService.getAllSchoolsForUser(this.owner.owner_id)
      .subscribe(schools => {
        this.schools = schools;
        if (this.schools.length > 0) {
          this.selectedSchool = this.schools[0];
          this.selectedSchoolChange.emit(this.schools[0]);
      }
    });
    // need a check here so that if they dont have schools it throws a popup flag so they can create a school
  }


  selectSchool(school: School) {
    this.selectedSchool = school;
    this.selectedSchoolChange.emit(school);
  }
}
