import { Component } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { School } from '../../../models/school.model';

@Component({
  selector: 'app-schools',
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.scss']
})
export class SchoolsComponent {
  selectedSchool: School;
  schools: School[];

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.getAllSchools();
  }

  getAllSchools(): void {
    this.schoolService.getAllSchools()
      .subscribe(schools => this.schools = schools);
  }


  selectSchool(school: School): void {
    this.selectedSchool = school;
  }
}

