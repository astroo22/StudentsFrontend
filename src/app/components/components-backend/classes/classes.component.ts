import { Component, Input, SimpleChanges  } from '@angular/core';
import { SchoolService } from '../../../services/school.service';
import { Class } from '../../../models/class.model';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent {
  @Input() classes: Class[];
  @Input() schoolID: string;
  // Things I need

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void{
  }
  ngOnChanges(changes: SimpleChanges){
    if (changes['schoolID']){
      this.GetClasses(this.schoolID)
    }
  }
  
  GetClasses(schoolID:string):void{
    this.schoolService.getClassesForSchool(schoolID).subscribe(classes => {
      this.classes = classes;
    });
  }

}
