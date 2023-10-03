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
  showModal: boolean = true; // Default value to show the modal
  doNotShowAgain: boolean = false;
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
  ngOnInit(): void {
    // Check user's preference from local storage
    const hideModalPreference = localStorage.getItem('hideModal');
    if (hideModalPreference === 'true') {
      this.showModal = false;
    }
  }

  closeModal(): void {
    this.showModal = false;
    // If the user checks "Do not show this again", save their preference in local storage
    if (this.doNotShowAgain) {
      localStorage.setItem('hideModal', 'true');
    }
  }

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
}