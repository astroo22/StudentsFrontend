import { Component, OnInit, Input } from '@angular/core';
import { Student } from '../../../models/student.model';
import { ReportCard } from '../../../models/report-card.model';
//import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
 // providers: [DatePipe] // add DatePipe to providers
})
export class StudentComponent implements OnInit {
  @Input() student!: Student;
  reportCard!: ReportCard;
  showReportCard: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleReportCard(): void {
    this.showReportCard = !this.showReportCard;
  }

  getReportCard(): void {
    // call backend service to get report card for this student
    // set this.reportCard to the retrieved report card
  }

}