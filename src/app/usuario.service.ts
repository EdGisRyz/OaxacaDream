import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = "http://localhost:8080/OaxacaDream-app/usuarios";


  constructor(private clienteHttp: HttpClient) { }

  obtenerUsuariosLista(): Observable<Usuario[]>{
    return this.clienteHttp.get<Usuario[]>(this.urlBase);
  }
}
