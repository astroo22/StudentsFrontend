import { Component,Input, Output, EventEmitter } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-personal-schools-scrollbar',
  templateUrl: './personal-schools-scrollbar.component.html',
  styleUrls: ['./personal-schools-scrollbar.component.scss']
})
export class PersonalSchoolsScrollbarComponent {
  @Input() disabled: boolean = false;
  @Output() selectedSchoolChange = new EventEmitter<School>();
  @Output() createSchoolEvent = new EventEmitter<void>();

  selectedSchool: School;
  schools: School[];
  owner: User;

  constructor(
    private schoolService: SchoolService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()){
      if (localStorage.getItem('ownerID') != null){
        this.getAllSchools();
      }
    }
  }

  getAllSchools(){
    this.schoolService.getAllSchoolsForUser(localStorage.getItem('ownerID')!)
      .subscribe(schools => {
        console.log(schools);
        this.schools = schools.sort((a: { avg_gpa: number; }, b: { avg_gpa: number; }) => b.avg_gpa - a.avg_gpa);
        // this.schools.forEach((school, index) => {
        //   school.ranking = index + 1;
        // });
        const schoolIds = this.schools.map(school => school.school_id);
        localStorage.setItem('userSchoolIds', JSON.stringify(schoolIds));

        if (this.schools.length > 0) {
          this.selectedSchool = this.schools[0];
          this.selectedSchoolChange.emit(this.schools[0]);
      }
    });
  }

  refreshSchools():void{
    console.log("refresh hit")
    if(this.authService.isAuthenticated()){
      this.schoolService.getAllSchoolsForUser(localStorage.getItem('ownerID')!)
        .subscribe(schools => {
          console.log(schools);
          this.schools = schools.sort((a: { avg_gpa: number; }, b: { avg_gpa: number; }) => b.avg_gpa - a.avg_gpa);
          // this.schools.forEach((school, index) => {
          //   school.ranking = index + 1;
          // });
          const schoolIds = this.schools.map(school => school.school_id);
          localStorage.setItem('userSchoolIds', JSON.stringify(schoolIds));
  
          if (this.schools.length > 0) {
            this.selectedSchool = this.schools[0];
            this.selectedSchoolChange.emit(this.schools[0]);
        }
      });
    }
  }

  createSchoolHelper(){
    console.log("create school helper hit");
    this.createSchoolEvent.emit();
  }


  selectSchool(school: School) {
    this.selectedSchool = school;
    this.selectedSchoolChange.emit(school);
  }
  removeSchool(deleteSchool: School): void {
    // Remove the deleted school from the schools array
    this.schools = this.schools.filter(school => school.school_id !== deleteSchool.school_id);
    this.selectedSchoolChange.emit(this.schools[0]);
  }

}
