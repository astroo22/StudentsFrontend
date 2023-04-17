import { Component, OnInit, Input  } from '@angular/core';
import { Professor } from '../../../models/professor.model';
import { ProfessorService } from '../../../services/professor.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit{
  @Input() professor: Professor;
  @Input() professorID: string;

  constructor(private professorService: ProfessorService) { }
  showProfessor: boolean = false;
  toggleProfessor():void{
    if(this.professorID.length>0){
      this.professorService.getProfessor(this.professorID).subscribe((data: Professor)=>{
        console.log(data)
        this.professor = data
        this.showProfessor = !this.showProfessor;
      });
    }
  }
  ngOnInit(): void {
  }
}
