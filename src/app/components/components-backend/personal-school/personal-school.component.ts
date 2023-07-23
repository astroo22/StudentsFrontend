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
  unenrollStudents: string[] = [];
  updatedSchoolName?: string;
  editSchoolNameFlag: boolean = false;

  // flags
  showDeleteConfirmDialog: boolean =false;
  confirmDeleteDialogMessage: string = "Are you sure you want to delete this school?"

  constructor(private schoolService: SchoolService,private reportCardService: ReportCardService) {}

  ngOnChanges(changes: SimpleChanges){
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
    console.log(student)
    const index = this.unenrollStudents.indexOf(student.student_id);
    if (index === -1) {
      // Add student_id to unenrollStudents list if it's not present
      this.unenrollStudents.push(student.student_id);
      console.log("in if");
    } else {
      // Remove student_id from unenrollStudents list if it's already there
      this.unenrollStudents.splice(index, 1);
    }
    console.log("after if")
    // Apply filters and sort again to update list
    this.filterStudentsByGrade();
    this.sortStudentsBy();
    this.hasChanges = true;
  }
  saveChanges(): void{
    let name = "";
    let studentIds: string[] = [];
    console.log(this.unenrollStudents)
    if (this.updatedSchoolName && this.updatedSchoolName !== this.school.school_name) {
      name = this.updatedSchoolName.length > 0 ? this.updatedSchoolName : "";
    }
    if(this.unenrollStudents.length >0){
      studentIds = this.unenrollStudents;
      console.log(studentIds)
    }
    this.schoolService.updateSchool(this.school.school_id, name, studentIds).subscribe((response) => {
      // Handle response
      this.editSchoolNameFlag = false;
      if (name != ""){
        this.school.school_name = name
      }
    });
    if(this.unenrollStudents.length >0){
      this.schoolService.updateSchoolAvgGpa(this.school.school_id).subscribe((response)=>{
        console.log(response);
      });
      console.log("updated school avg")
    }
    this.hasChanges = false;
   
  }
  // *ngIf="showDeleteConfirmDialog" 
  //                           [message]="confirmDeleteDialogMessage" 
  //                           (confirm)="deleteSchool($event)">
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
