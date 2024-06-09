import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoPago } from '../models/metodo-pago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  private urlBase = "http://localhost:8080/oaxacaDream-app/metodos";

  constructor(private clienteHttp: HttpClient) { }

  obtenerMetodos():Observable<MetodoPago[]> {
    return this.clienteHttp.get<MetodoPago[]>(this.urlBase);
  }

  agregarMetodo(metodo: MetodoPago): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, metodo);
  }

  obtenerMetodoPorId(id: number){
    return this.clienteHttp.get<MetodoPago>(`${this.urlBase}/${id}`);
  }

  editarMetodo(id: number, metodo: MetodoPago): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, metodo);
  }

  eliminarMetodo(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }
}
