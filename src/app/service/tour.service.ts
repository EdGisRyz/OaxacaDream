import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour';

@Injectable({
  providedIn: 'root'
})
export class tourService {

  private urlBase = "http://localhost:8080/oaxacaDream-app/tours";

  constructor(private clienteHttp: HttpClient) { }

  obtenerTours(): Observable<Tour[]>{
    return this.clienteHttp.get<Tour[]>(this.urlBase);
  }

  agregarTour(tour: Tour): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, tour);
  }

  obtenerTourPorId(id: number){
    return this.clienteHttp.get<Tour>(`${this.urlBase}/${id}`);
  }

  editarTour(id: number, tour: Tour): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, tour);
  }

  eliminarTour(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }
  
}