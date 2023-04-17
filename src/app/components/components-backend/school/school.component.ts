import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { School } from '../../../models/school.model';
import { SchoolService } from '../../../services/school.service';
@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent {
    @Input() school: School;
   

}
