import { Component, Input,SimpleChanges,OnInit} from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';
import { Professor } from '../../../models/professor.model';
import { Grade } from '../../../models/grade.model';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss']
})
export class SchoolComponent implements OnInit {
  @Input() school: School;
  numberOfStudents: number;
  averageGPA: number;
  schoolRanking: number;
 
  iconPaths: string[] = ['assets/icons/gold.png', 'assets/icons/silver.png', 'assets/icons/bronze.png'];
  professorIcons: string[] = this.iconPaths;
  

  // pageination
  topProfessors: Professor[] = [];
  topGrades: Grade[] = []; 
  visibleProfessors: Professor[] = [];
  visibleGrades: Grade[] = [];
  currentIndexGrades: number = 0;
  currentIndexProfessors: number = 0;
  gradeSize: number =5;
  pageSize: number = 10;
  scrollSize: number =5;

  // flags
  isPreviousDisabledGrades: boolean = true;
  isNextDisabledGrades: boolean = false;
  isPreviousDisabledProfessors: boolean = true;
  isNextDisabledProfessors: boolean = false;

  gradeStates: any[] = [
    { start: 0, end: 4, previousDisabled: true, nextDisabled: false },
    { start: 5, end: 9, previousDisabled: false, nextDisabled: false },
    { start: 10, end: 11, previousDisabled: false, nextDisabled: true },
  ];
  currentGradeState: number = 0;

  constructor(
      private schoolService: SchoolService
      ) {}

  ngOnInit(): void {

    
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['school']){
      this.getSchoolData(this.school.school_id)
      this.numberOfStudents = this.school.student_list.length
      this.isPreviousDisabledGrades = true;
      this.isNextDisabledGrades = false;
      this.isPreviousDisabledProfessors = true;
      this.isNextDisabledProfessors= false;
      this.currentIndexGrades =0;
      this.currentIndexProfessors = 0;
      this.updateButtonsDisabledState()
    }
    
  }

  getSchoolData(schoolID:string): void {
    this.schoolService.getSchoolData(schoolID).subscribe((data: any) => {
      const schoolData = data[0];
      const professorsData = data[1];
      this.topProfessors = professorsData;
      this.topProfessors.forEach((professor: Professor, i: number) => {
        professor.rank = i + 1;
      });
      this.topGrades = schoolData;
      this.topGrades.forEach((grade: Grade, i: number)=>{
        grade.rank = i +1;
      });
      this.visibleProfessors = this.topProfessors.slice(this.currentIndexProfessors, this.currentIndexProfessors + this.pageSize);
      this.updateVisibleGrades();
    });
  }
  updateVisibleProfessors() {
    const start = this.scrollSize * this.currentIndexProfessors;
    const end = Math.min(start + this.pageSize, this.topProfessors.length);
    this.visibleProfessors = this.topProfessors.slice(start, end);
  }
  updateVisibleGrades(): void {
   
    const { start, end } = this.gradeStates[this.currentGradeState];
    const grades = [...this.topGrades];

    // Add empty grades to fill the remaining slots
    while (grades.length < end + 1) {
      grades.push({ rank: 0, grade: 0, avg_gpa: 0.0 });
    }

    this.visibleGrades = grades.slice(start, end + 1);

  }
  updateButtonsDisabledState(): void {
    const maxIndexG = this.topGrades.length;
    this.isPreviousDisabledGrades = this.currentIndexGrades === 0;
    this.isNextDisabledGrades = this.currentIndexGrades === 10;
  
    const maxIndexP = Math.floor(this.topProfessors.length / 5)-2;
    this.isPreviousDisabledProfessors = this.currentIndexProfessors === 0;
    if (maxIndexP === 0){
      this.isNextDisabledProfessors = false
    }else{

      this.isNextDisabledProfessors = this.currentIndexProfessors === maxIndexP;
    }
  }
  
  
  scrollProfessors(direction: number): void {
   const maxIndex = Math.floor(this.topProfessors.length / 5) -2;
   this.currentIndexProfessors += direction;
   if (this.currentIndexProfessors < 0) {
     this.currentIndexProfessors = maxIndex;
   } else if (this.currentIndexProfessors > maxIndex) {
     this.currentIndexProfessors = 0;
   }
   this.updateVisibleProfessors();
   this.updateButtonsDisabledState();
  }
  scrollGrades(direction: number): void {
    const states = [
      { start: 0, end: 4 },
      { start: 5, end: 9 },
      { start: 10, end: 11 }
    ];
    const currentState = states.find(state => state.start <= this.currentIndexGrades && this.currentIndexGrades <= state.end);
    const currentStateIndex = currentState ? states.indexOf(currentState) : 0;
  
    if (direction > 0 && currentStateIndex === 2) {
      return;
    }
  
    this.currentIndexGrades = currentStateIndex === undefined ? states[0].start : this.currentIndexGrades + direction;
    const newState = states.find(state => state.start === this.currentIndexGrades);
    const start = newState ? newState.start : Math.max(0, this.topGrades.length - this.gradeSize);
    const end = newState ? newState.end : this.topGrades.length - 1;
    this.visibleGrades = this.topGrades.slice(start, end + 1);
    this.updateButtonsDisabledState();
  } 
} 