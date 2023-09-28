import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TabsComponent } from '../tabs/tabs.component'; 
import { SchoolsComponent } from '../schools/schools.component';
import { PersonalSchoolsScrollbarComponent } from '../personal-schools-scrollbar/personal-schools-scrollbar.component';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
 
})
export class ProjectComponent implements AfterViewInit  {
  @ViewChild(TabsComponent) tabsComponent: TabsComponent;
  @ViewChild(SchoolsComponent) schools: SchoolsComponent;
  //@ViewChild(PersonalSchoolsScrollbarComponent) personalSchools: PersonalSchoolsScrollbarComponent;

  constructor(
     private authService: AuthService,
     private router: Router,
  ) {}
  ngAfterViewInit() {
    if (this.isLoggedIn()) {
      this.tabsComponent.selectTabByLabel('MY SCHOOLS');
    } else {
      this.tabsComponent.selectTabByLabel('HIGHSCORES');
    }
  }
  
  // ngOnInit(): void {
  //   this.selectTab(this.tabs[this.initialTabIndex] || this.tabs[0]);
  // }

  isLoggedIn(): Boolean{
    return this.authService.isAuthenticated();
  }
  loginButton(){
    this.router.navigate(['/login'])
  }

  createAccountButton(){
    this.router.navigate(['/create-account'])
  }
  refreshHighScores(){
    console.log("refresh");
    this.schools.refreshSchools();
  }
  // refreshUserSchools(){
  //   console.log("refresh User");
  //   if(this.personalSchools) {
  //     this.personalSchools.refreshSchools();
  //   } else {
  //     console.error('personalSchools is not initialized yet');
  //   }
  // }
}