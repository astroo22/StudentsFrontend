import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/components-main/header/header.component';
import { FooterComponent } from './components/components-main/footer/footer.component';
import { HomeComponent } from './components/components-main/home/home.component';
import { ResumeComponent } from './components/components-main/resume/resume.component';
import { ContactComponent } from './components/components-main/contact/contact.component';
import { ProjectComponent } from './components/components-backend/project/project.component';
import { StudentComponent } from './components/components-backend/student/student.component';
import { ClassComponent } from './components/components-backend/class/class.component';
import { ProfessorComponent } from './components/components-backend/professor/professor.component';
import { ReportCardComponent } from './components/components-backend/report-card/report-card.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SchoolsComponent } from './components/components-backend/schools/schools.component';
import { SchoolComponent } from './components/components-backend/school/school.component';
import { ClassesComponent } from './components/components-backend/classes/classes.component';
import { SchoolCardComponent } from './components/components-backend/school-card/school-card.component';
//import { PopupRectDirective } from './directives/popup-rect.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ResumeComponent,
    ContactComponent,
    ProjectComponent,
    StudentComponent,
    ClassComponent,
    ProfessorComponent,
    ReportCardComponent,
    SchoolsComponent,
    SchoolComponent,
    ClassesComponent,
    SchoolCardComponent
   
   // PopupRectDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
