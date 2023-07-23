import { Component,OnInit, Input } from '@angular/core';
import { ReportCard } from '../../../models/report-card.model';
import { ReportCardService } from '../../../services/report-card.service';
@Component({
  selector: 'app-report-card',
  templateUrl: './report-card.component.html',
  styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
  @Input() reportCard: ReportCard;
  @Input() studentName: string;
  @Input() studentID: string
  constructor(private reportCardService: ReportCardService){}
  showReportCard: boolean = false;

  toggleReportCard(): void {
    console.log("did hit yes no maybeso?")
    if (this.studentID.length>0){
      this.reportCardService.getReportCard(this.studentID).subscribe((data: ReportCard) => {
        console.log(data); 
      this.reportCard = data
      this.showReportCard = !this.showReportCard;
    }); 
  }
}
  

  ngOnInit(): void {

  }
}
