import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private urlBase = "http://localhost:8080/oaxacaDream-app/pagos";

  constructor(private clienteHttp: HttpClient) { }

  obtenerPagos():Observable<Pago[]> {
    return this.clienteHttp.get<Pago[]>(this.urlBase);
  }

  agregarPago(pago: Pago): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, pago);
  }

  obtenerPagoPorId(id: number){
    return this.clienteHttp.get<Pago>(`${this.urlBase}/${id}`);
  }

  editarPago(id: number, pago: Pago): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, pago);
  }

  eliminarPago(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }
}
