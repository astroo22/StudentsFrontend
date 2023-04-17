import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Student } from '../../../models/student.model';
import { ReportCard } from '../../../models/report-card.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
  // providers: [ReportCard] // add DatePipe to providers
})

export class StudentComponent implements OnInit {
  @Input() student: Student;
  reportCard: ReportCard;
  


  ngOnInit(): void {
  }
  
// going to need to cache this somehow later
 
  // getReportCard(): void {
  //   // call backend service to get report card for this student
  //   // set this.reportCard to the retrieved report card
  // }
  // displayReportCard(student: Student) {
  //   this.reportCardService.getReportCard(student.StudentID).subscribe((data: ReportCard) => {
  //     console.log(data); // Log the report card data to the console for debugging purposes
  //     // Display the report card data however you would like in the HTML template
  //   });
  // }

}
