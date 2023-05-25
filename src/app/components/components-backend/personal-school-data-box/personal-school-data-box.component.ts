import { Component, Input,SimpleChanges,OnInit} from '@angular/core';
import { School } from '../../../models/school.model';
import { Student } from 'src/app/models/student.model';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-personal-school-data-box',
  templateUrl: './personal-school-data-box.component.html',
  styleUrls: ['./personal-school-data-box.component.scss']
})
export class PersonalSchoolDataBoxComponent {
 @Input() masterStudentsRecord: Student[];
  
}
