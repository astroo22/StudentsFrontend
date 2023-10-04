import { Component, Input,Output, EventEmitter,SimpleChanges,OnInit} from '@angular/core';
import { School } from '../../../models/school.model';
import { Student } from 'src/app/models/student.model';
import { ReportCard } from 'src/app/models/report-card.model';
import { SchoolService } from '../../../services/school.service';
import { ReportCardService } from '../../../services/report-card.service';

@Component({
  selector: 'app-personal-school',
  templateUrl: './personal-school.component.html',
  styleUrls: ['./personal-school.component.scss']
})
export class PersonalSchoolComponent {
  @Input() school: School;

  @Output() schoolDeleted: EventEmitter<School> = new EventEmitter<School>();

  numberOfStudents?: number;
  masterStudentsRecord: Student[];
  filteredStudents: Student[];
  showUnenrolled: boolean = false;
  trashIcon: string = 'assets/icons/trash.png';
  arrowIcon: string = 'assets/icons/arrow.png';
  updateNameIcon: string= 'assets/icons/edit.png';
  confirmIcon: string='assets/icons/checkmark.png';
  lockIcon: string='assets/icons/lock.png';
  cancelIcon: string='assets/icons/cancel.png';
  wingsIcon: string ='assets/icons/wings.png';
  selectedGrade: string ="0";
  selectedSort: string = "gpa";
 
  reportCardCache: Map<string, ReportCard> = new Map();
  currentReportCard?: ReportCard;

  // update vars
  hasChanges: boolean = false;
  isNameConfirmed: boolean = false;
  changedStudentIds: string[] = [];
  updatedSchoolName?: string;
  editSchoolNameFlag: boolean = false;

  // flags
  showDeleteConfirmDialog: boolean =false;
  confirmDeleteDialogMessage: string = "Are you sure you want to delete this school?"
  skipDataFetch: boolean = false;
  

  constructor(private schoolService: SchoolService,private reportCardService: ReportCardService) {}

  ngOnChanges(changes: SimpleChanges){
    if (this.skipDataFetch) {
      return;
    }
    if (changes['school']){
      this.hasChanges = false;
      this.isNameConfirmed = false;
      this.updatedSchoolName = "";
      this.editSchoolNameFlag = false;
      this.numberOfStudents = this.school.student_list.length
      this.getStudentData()
    }
  }


  getStudentData(){
    this.schoolService.getStudentsForSchool(this.school.school_id).subscribe((data:any)=> {
      this.masterStudentsRecord = data;
      this.masterStudentsRecord.sort((a, b) => (b.enrolled === true ? 1 : -1) - (a.enrolled === true ? 1 : -1));
      this.masterStudentsRecord = this.masterStudentsRecord.map(student => ({ ...student, expanded: false }));
      this.filteredStudents = [...this.masterStudentsRecord];
      this.filterStudentsByGrade();
    });
  }

  sortStudentsBy() {
    if (this.filteredStudents) {
      if (this.selectedSort === 'name') {
        this.filteredStudents = this.filteredStudents.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (this.selectedSort === 'gpa') {
        this.filteredStudents = this.filteredStudents.sort((a, b) => {
          return b.avg_gpa - a.avg_gpa;
        });
      }
      //this.masterStudentsRecord.sort((a, b) => (b.enrolled === true ? 1 : -1) - (a.enrolled === true ? 1 : -1));
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
    // Apply filter for enrolled/unenrolled students based on showUnenrolled
    this.filteredStudents = this.filteredStudents.filter((student) => this.showUnenrolled ? true : student.enrolled);
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
  // yo the errors on this are nuts????? why are date objects such an issue in js?
  // TODO: Ok so the data type is being reported as both a string and Date object
  // this is due to the model being date object but for some reason it becomes a string between its
  // scan and arriving at the frontend but still considers itself a date object.
  // I can find and fix this but I might just change the model to be string as well and convert from backend
  // but do it later as there might be logic collisions. 
  getFormattedDate(dob: string | Date): string {
    let date: Date;

    // If dob is a string, convert it to a Date object
    if (typeof dob === 'string') {
        date = new Date(dob);
    } else {
        date = dob;
    }

    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}


  toggleRecord(student: Student): void {
    if (!student.expanded) {
      // check if the report card is in the cache
      if (this.reportCardCache.has(student.student_id)) {
        // if it is in the cache, use it
        student.reportCard = this.reportCardCache.get(student.student_id);
      } else {
        // if not in the cache, fetch it
        this.reportCardService.getReportCard(student.student_id).subscribe((reportCard) => {
          // add to cache
          this.reportCardCache.set(student.student_id, reportCard);
          // use it
          student.reportCard = reportCard;
        });
      }
    }
    // Toggle the expanded state
    student.expanded = !student.expanded;
  }

  setExpandedToFalse(): void {
    this.masterStudentsRecord.forEach((student) => {
      student.expanded = false;
    });
  }
  

  // funcs for school update
  editSchoolName(): void {
    this.editSchoolNameFlag = true;
    this.updatedSchoolName = this.school.school_name;
    this.hasChanges = true;
  }

  trashStudent(student: Student): void {
    student.enrolled = !student.enrolled;
    if (this.changedStudentIds.includes(student.student_id)) {
      // If already in the list, remove it
      this.changedStudentIds = this.changedStudentIds.filter(id => id !== student.student_id);
    } else {
      // If not in the list, add it
      this.changedStudentIds.push(student.student_id);
    }

    // Apply filters and sort again to update list
    this.filterStudentsByGrade();
    this.sortStudentsBy();
    this.hasChanges = true;
}


saveChanges(): void {
  let name = "";
  let newAvgGpa: number;

  if (this.updatedSchoolName && this.updatedSchoolName !== this.school.school_name) {
    name = this.updatedSchoolName.length > 0 ? this.updatedSchoolName : "";
  }

  newAvgGpa = this.computeAvgGPA();
  this.skipDataFetch = true;
  this.school.avg_gpa = newAvgGpa;
  this.skipDataFetch = false;

  this.schoolService.updateSchool(this.school.school_id, name, this.changedStudentIds, newAvgGpa).subscribe((response) => {
    this.editSchoolNameFlag = false;
    if (name !== "") {
      this.school.school_name = name;
    }
    this.getStudentData();
    this.changedStudentIds = [];
  });
  this.hasChanges = false;
}

computeAvgGPA(): number {
      let totalGPA = 0;
      let numberOfEnrolledStudents = 0;
  
      this.masterStudentsRecord.forEach(student => {
          if (student.enrolled) {
              totalGPA += student.avg_gpa;
              numberOfEnrolledStudents++;
          }
      });
  
    console.log(numberOfEnrolledStudents)
    let avgGPA = numberOfEnrolledStudents > 0 ? totalGPA / numberOfEnrolledStudents : 0;
    console.log(avgGPA)
    return parseFloat(avgGPA.toFixed(2));
  }

  confirmSchoolName(): void {
    if (this.updatedSchoolName !== this.school.school_name) {
      this.isNameConfirmed = true;
    } else {
      this.isNameConfirmed = false;
      this.hasChanges = false;
      this.editSchoolNameFlag = false;
    }
  }
  cancelSchoolName(): void{
    this.hasChanges = false;
    this.editSchoolNameFlag = false;
    this.updatedSchoolName = this.school.school_name
  }
  openDeleteConfirmDialog(){
    this.showDeleteConfirmDialog = true;
  }
  deleteSchool(confirm: boolean){
    this.showDeleteConfirmDialog = false;
    if(confirm){
      console.log("hit delete in school component")
      this.schoolService.deleteSchool(this.school.school_id).subscribe(res => {
        console.log(res);
        this.schoolDeleted.emit(this.school);
    }, error => {
        console.error(error);
    });
    }
  }
  
}
