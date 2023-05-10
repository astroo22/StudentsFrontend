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
 // @Input() schoolID: string;
  numberOfStudents: number;
  averageGPA: number;
  schoolRanking: number;
  topProfessors: Professor[] = [];
  topGrades: Grade[] = [];
  iconPaths: string[] = ['assets/icons/first.png', 'assets/icons/second.png', 'assets/icons/third.png'];
  professorIcons: string[] = this.iconPaths;
  visibleProfessors: Professor[] = [];
  currentIndex: number = 0;
  pageSize: number = 5;

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['school']){
      this.getSchoolData(this.school.school_id,this.school.professor_list)
      this.numberOfStudents = this.school.student_list.length
      this.updateVisibleProfessors();
    }
    
  }

  getSchoolData(schoolID:string,professorList:string[]): void {
    this.schoolService.getSchoolData(schoolID,professorList).subscribe((data: any) => {
      const schoolData = data[0];
      const professorsData = data[1];
      // this will need help once other stuff works
      console.log(professorsData);
      console.log(schoolData)
      //this.averageGPA = professorsData.averageGPA;
      //this.schoolRanking = schoolData.Ranking;
      this.topProfessors = professorsData;
      this.topProfessors.forEach((professor: Professor, i: number) => {
        professor.rank = i + 1;
      });
      this.topGrades = schoolData;
      this.visibleProfessors = this.topProfessors.slice(this.currentIndex, this.currentIndex + this.pageSize);
    });
  }
  updateVisibleProfessors() {
    this.visibleProfessors = this.topProfessors.slice(this.currentIndex, this.currentIndex + this.pageSize);
  }
  
  scrollProfessors(direction: number): void {
    const maxIndex = this.topProfessors.length - this.pageSize;
    this.currentIndex += direction;
    if (this.currentIndex < 0) {
      this.currentIndex = maxIndex;
    } else if (this.currentIndex > maxIndex) {
      this.currentIndex = 0;
    }
    this.updateVisibleProfessors();
  }
}