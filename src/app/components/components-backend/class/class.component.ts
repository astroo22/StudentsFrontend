import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Class } from '../../../models/class.model';
import { Professor } from 'src/app/models/professor.model';
import { ClassService } from 'src/app/services/class.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit{
  @Input() classID: string;
  @Input() class: Class;

  constructor(private classService: ClassService){}
  ngOnInit(): void {
    // this.classService.getClass(this.classID).subscribe((data: Class)=>{
    //   this.class = data
    // });
  }
  
}
