import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = "http://localhost:8080/OaxacaDream-app/usuarios";


  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuariosLista(): Observable<Usuario[]>{
    return this.clienteHttp.get<Usuario[]>(this.urlBase).pipe(
      catchError((error) => {
      console.error('Error fetching items', error);
      return of([]);
    })
    );
  }

  getUsers(): Observable<any>{
    return this.clienteHttp.get(this.urlBase);
  }

  editarusuarioTour(id: number, usuario: Usuario): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, usuario);
  }

  eliminarUsuarioTour(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
