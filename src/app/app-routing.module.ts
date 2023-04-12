import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeComponent } from './resume/resume.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resume', component: ResumeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
