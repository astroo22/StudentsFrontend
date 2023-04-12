import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/components-main/home/home.component';
import { ProjectComponent } from './components/components-backend/project/project.component';
import { ContactComponent } from './components/components-main/contact/contact.component';
import { ResumeComponent } from './components/components-main/resume/resume.component';

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
