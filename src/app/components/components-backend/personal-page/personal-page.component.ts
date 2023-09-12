import { Component,ViewChild  } from '@angular/core';
import { PersonalSchoolsScrollbarComponent } from '../personal-schools-scrollbar/personal-schools-scrollbar.component';
import { School } from '../../../models/school.model';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent {
  selectedSchool: School | null = null;
  isCreatingSchool: boolean = false;
  @ViewChild('schoolsScrollbar') schoolsScrollbar: PersonalSchoolsScrollbarComponent;
  public state: 'list' | 'view' | 'create' = 'view';

  onSelectSchool(value: School){
    this.selectedSchool = value;
    this.state = 'view';
  }
  createSchool() {
    this.state = 'create';
  }
  newSchoolCreated(event: boolean){
    if (event) {
        this.schoolsScrollbar.getAllSchools();
    }
  }
}
