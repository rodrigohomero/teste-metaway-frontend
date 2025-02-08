import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cep } from '../model/cep.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private http: HttpClient) { }

  buscar(cep: string): Observable<Cep> {

    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json`);
  }
}