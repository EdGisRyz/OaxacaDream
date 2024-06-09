import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = "http://localhost:8080/oaxacaDream-app/usuarios";


  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]>{
    return this.clienteHttp.get<Usuario[]>(this.urlBase);
  }

  agregarUsuario(usuario: Usuario): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, usuario);
  }

  obtenerUsuarioPorId(id: number){
    return this.clienteHttp.get<Usuario>(`${this.urlBase}/${id}`);
  }

  editarUsuario(id: number, usuario: Usuario): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, usuario);
  }

  eliminarUsuario(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
