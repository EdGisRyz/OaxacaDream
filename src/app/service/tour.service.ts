import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour';

@Injectable({
  providedIn: 'root'
})
export class tourService {

  private urlBase = "http://localhost:8080/OaxacaDream-app/tours";


  constructor(private clienteHttp: HttpClient) { }

  obtenerToursLista(): Observable<Tour[]>{
    return this.clienteHttp.get<Tour[]>(this.urlBase);
  }

  getTours(): Observable<any> {
    return this.clienteHttp.get(this.urlBase);
  }

}