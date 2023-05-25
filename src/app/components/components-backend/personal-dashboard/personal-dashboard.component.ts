import { Component, Input,SimpleChanges,OnInit} from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';

@Component({
  selector: 'app-personal-dashboard',
  templateUrl: './personal-dashboard.component.html',
  styleUrls: ['./personal-dashboard.component.scss']
})
export class PersonalDashboardComponent implements OnInit{
  @Input() school: School;
  
  ngOnInit(): void {
    
  }
}
