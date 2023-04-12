import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

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
    ReportCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
