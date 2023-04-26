import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IAlunoDto } from '../models/IAlunoDto';
import { environment } from '../environment/environment';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private BASE_URL:String = environment.api;
  private TOKEN:String = environment.token;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Upgrade-Insecure-Requests': '1',
      'Authorization': 'Bearer ' + this.TOKEN // substitua "token" pelo seu token real
    }),
    withCredentials: false,
    rejectUnauthorized: false // defina como false para desabilitar a verificação do certificado SSL
  };

  constructor(private http: HttpClient) { }

  buscarTodosAlunos(): Observable<IAlunoDto[]> {
    return this.http.get<IAlunoDto[]>(this.BASE_URL + "/alunos", this.httpOptions).pipe(
      tap(() => console.log('Requisição realizada com sucesso.')),
      retry(1) // tenta 1 vez em caso de erro
    );
  }
}
