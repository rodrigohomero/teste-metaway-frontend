import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Raca } from '../model/pet.model';

@Injectable({
  providedIn: 'root',
})
export class RacaService {
  private apiUrl = 'http://localhost:8080/racas';

  constructor(private http: HttpClient) {}

  getRacas(): Observable<Raca[]> {
    return this.http.get<Raca[]>(this.apiUrl);
  }

  getRacaById(id: number): Observable<Raca> {
    return this.http.get<Raca>(`${this.apiUrl}/${id}`);
  }

  addRaca(Raca: Raca): Observable<Raca> {
    return this.http.post<Raca>(this.apiUrl, Raca);
  }

  updateRaca(id: number, Raca: Raca): Observable<Raca> {
    return this.http.put<Raca>(`${this.apiUrl}/${id}`, Raca);
  }

  deleteRaca(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
