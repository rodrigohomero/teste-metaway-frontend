import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../model/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = 'http://localhost:8080/pets';

  constructor(private http: HttpClient) {}

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  getPetById(id: number): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  getPetByIdCliente(id: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/cliente/${id}`);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  updatePet(id: number, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
