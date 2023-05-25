import { Component, Input,SimpleChanges,OnInit} from '@angular/core';
import { School } from '../../../models/school.model';
import { Student } from 'src/app/models/student.model';
import { SchoolService } from '../../../services/school.service';

@Component({
  selector: 'app-personal-school',
  templateUrl: './personal-school.component.html',
  styleUrls: ['./personal-school.component.scss']
})
export class PersonalSchoolComponent {
  @Input() school: School;
  numberOfStudents: number;
  masterStudentsRecord: Student[];
  filteredStudents: Student[];
  trashIcon: string = 'assets/icons/trash.png'
  arrowIcon: string = 'assets/icons/arrow.png'
  selectedGrade: string ="0";
  selectedSort: string = "gpa";
 
 

  constructor(private schoolService: SchoolService) {}

  ngOnChanges(changes: SimpleChanges){
    if (changes['school']){
      console.log(this.school)
      this.numberOfStudents = this.school.student_list.length
      this.getStudentData()
    }
  }
  getStudentData(){
    this.schoolService.getStudentsForSchool(this.school.school_id).subscribe((data:any)=> {
      this.masterStudentsRecord = data;
      this.filterStudentsByGrade();
    });
  }
  // sortStudentsByGrade(){
  //   i
  // }
  sortStudentsBy() {
    if (this.masterStudentsRecord) {
      if (this.selectedSort === 'name') {
        this.filteredStudents = this.filteredStudents.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (this.selectedSort === 'gpa') {
        this.filteredStudents = this.filteredStudents.sort((a, b) => {
          return b.avg_gpa - a.avg_gpa;
        });
      }
    }
  }
  filterStudentsByGrade() {
    if (this.selectedGrade === '0') {
      this.filteredStudents = this.masterStudentsRecord;
    } else {
      this.filteredStudents = this.masterStudentsRecord.filter((student) => {
        return student.current_year.toString() === this.selectedGrade;
      });
    }
    this.filteredStudents = this.filteredStudents.map(student => ({ ...student, expanded: false }));
  }
  getGradeLabel(year: number): string {
    const suffixes = ['th', 'st', 'nd', 'rd'];
    var digit
    if (year <=10){
        digit = year % 10;
    }else{
      digit = 0;
    }
    const suffix = suffixes[digit] || suffixes[0];
    return `${year}${suffix} Grade`;
  }
  toggleRecord(student: Student): void {
    student.expanded = !student.expanded; // Toggle the expanded state
  }
  
}
