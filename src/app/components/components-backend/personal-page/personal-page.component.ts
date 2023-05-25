import { Component, Input,SimpleChanges,OnInit} from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent {
  selectedSchool: School;

  onSelectSchool(value: School){
    this.selectedSchool = value;
  }
}
