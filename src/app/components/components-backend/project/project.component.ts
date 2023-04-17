import { Component, OnInit } from '@angular/core';
import { Student } from '../../../models/student.model';
import { ReportCard } from '../../../models/report-card.model';
import { StudentService } from '../../../services/student.service';
import { ReportCardService } from '../../../services/report-card.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentService: StudentService, private reportCardService: ReportCardService) { }
  
  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }
  // displayReportCard(student: Student) {
  //   this.reportCardService.getReportCard(student.StudentID).subscribe((data: ReportCard) => {
  //     console.log(data); // Log the report card data to the console for debugging purposes
  //     // Display the report card data however you would like in the HTML template
  //   });
  // }
}