import { Component,Input } from '@angular/core';
import { School } from '../../../models/school.model';
import { ScrollingModule } from '@angular/cdk/scrolling';


@Component({
  selector: 'app-school-card',
  templateUrl: './school-card.component.html',
  styleUrls: ['./school-card.component.scss']
})

export class SchoolCardComponent {
  @Input() school: School;
}
