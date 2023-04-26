import { Component, OnInit } from '@angular/core';
import { IAlunoDto } from 'src/app/models/IAlunoDto';
import { AlunoService } from 'src/app/services/aluno.service';


@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {
  alunos: IAlunoDto[] = [];

  constructor(private alunoService: AlunoService) {}

  ngOnInit(): void {
    this.alunoService.buscarTodosAlunos()
      .subscribe(
        (result: IAlunoDto[]) => {
          this.alunos = result;
          console.log('Requisição realizada com sucesso.');
        })
        
  }
  
}
