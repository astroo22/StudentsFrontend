import { Component,OnInit, Input } from '@angular/core';
import { ReportCard } from '../../../models/report-card.model';
@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
  @Input() reportCard!: ReportCard;

  constructor() { }
  ngOnInit(): void {}
}
