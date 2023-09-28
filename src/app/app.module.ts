import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/components-main/footer/header/header.component';
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
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TabsComponent } from './components/components-backend/tabs/tabs.component';
import { TabComponent } from './components/components-backend/tab/tab.component';
import { PersonalPageComponent } from './components/components-backend/personal-page/personal-page.component';
import { LoginPageComponent } from './components/components-main/login-page/login-page.component';
import { CreateAccComponent } from './components/components-main/create-acc/create-acc.component';
import { PersonalSchoolsScrollbarComponent } from './components/components-backend/personal-schools-scrollbar/personal-schools-scrollbar.component';
import { PersonalSchoolComponent } from './components/components-backend/personal-school/personal-school.component';
import { PersonalCreateSchoolComponent } from './components/components-backend/personal-create-school/personal-create-school.component';
import { AccPageComponent } from './components/components-main/acc-page/acc-page.component';
import { ConfirmDialogComponent } from './components/components-main/confirm-dialog/confirm-dialog.component';
import { UserInactiveComponent } from './components/components-main/user-inactive/user-inactive.component';
import { AboutComponent } from './components/components-main/about/about.component';

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
    TabsComponent,
    TabComponent,
    PersonalPageComponent,
    LoginPageComponent,
    CreateAccComponent,
    PersonalSchoolsScrollbarComponent,
    PersonalSchoolComponent,
    PersonalCreateSchoolComponent,
    AccPageComponent,
    ConfirmDialogComponent,
    UserInactiveComponent,
    AboutComponent,
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
    MatCardModule,
    MatDialogModule,
    ScrollingModule,
    MatCardModule,
    ScrollingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
