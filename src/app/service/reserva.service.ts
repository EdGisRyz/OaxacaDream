import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserva } from '../models/reserva';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlBase = "http://localhost:8080/oaxacaDream-app/reservas";

  constructor(private clienteHttp: HttpClient) { }
  
  obtenerReservas():Observable<Reserva[]> {
    return this.clienteHttp.get<Reserva[]>(this.urlBase);
  }

  agregarReserva(empleado: Reserva): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, empleado);
  }

  obtenerReservaPorId(id: number){
    return this.clienteHttp.get<Reserva>(`${this.urlBase}/${id}`);
  }

  editarReserva(id: number, empleado: Reserva): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, empleado);
  }

  eliminarReserva(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
