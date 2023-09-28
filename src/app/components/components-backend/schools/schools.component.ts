import { Component,OnInit, OnDestroy } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent implements OnInit, OnDestroy  {
  selectedSchool: School;
  schools: School[];

  private subscription: Subscription;
  userOwnedSchoolIds: string[];

  constructor(
    private schoolService: SchoolService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    let userSchoolIds = localStorage.getItem('userSchoolIds');
    this.userOwnedSchoolIds = userSchoolIds ? JSON.parse(userSchoolIds) : [];

    this.getAllSchools();
    this.subscription = this.authService.userLoggedOut.subscribe(() => {
      this.userOwnedSchoolIds = [];
    });
  }

  getAllSchools(): void {
    this.schoolService.getAllSchools()
      .subscribe(schools => {
        this.schools = schools.sort((a: { avg_gpa: number; }, b: { avg_gpa: number; }) => b.avg_gpa - a.avg_gpa).slice(0,25);
        this.schools.forEach((school, index) => {
          school.ranking = index + 1;
          if(this.authService.isAuthenticatedPub() && this.userOwnedSchoolIds.includes(school.school_id)) {
          schools.userOwned = true; 
        }
        });
        
        if (this.schools.length > 0) {
          this.selectedSchool = this.schools[0];
      }
    });
  }

  isUserOwned(school: School): boolean {
    return this.userOwnedSchoolIds.includes(school.school_id);
  }
  
  selectSchool(school: School): void {
    this.selectedSchool = school;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  refreshSchools(): void {
    this.checkForUserData();
    this.schoolService.getAllSchools()
      .subscribe(schools => {
        this.schools = schools.sort((a: { avg_gpa: number; }, b: { avg_gpa: number; }) => b.avg_gpa - a.avg_gpa).slice(0,25);
        this.schools.forEach((school, index) => {
          school.ranking = index + 1;
          // Test if schools still properly show up
          // if(this.authService.isAuthenticatedPub() && this.userOwnedSchoolIds.includes(school.school_id)) {
          // schools.userOwned = true; 
          // }
        });
        
        if (this.schools.length > 0) {
          this.selectedSchool = this.schools[0];
      }
    });
  }
  checkForUserData():void{
    if(this.authService.isAuthenticatedPub()){
      console.log("checking user data")
      let userSchoolIds = localStorage.getItem('userSchoolIds');
      this.userOwnedSchoolIds = userSchoolIds ? JSON.parse(userSchoolIds) : [];
    }
  }

}

