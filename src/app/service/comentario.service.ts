import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comentario } from '../models/comentario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private urlBase = "http://localhost:8080/oaxacaDream-app/comentarios";

  constructor(private clienteHttp: HttpClient) { }

  obtenerComentarios():Observable<Comentario[]> {
    return this.clienteHttp.get<Comentario[]>(this.urlBase);
  }

  agregarComentario(comentario: Comentario): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, comentario);
  }

  obtenerComentarioPorId(id: number){
    return this.clienteHttp.get<Comentario>(`${this.urlBase}/${id}`);
  }

  editarComentario(id: number, comentario: Comentario): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, comentario);
  }

  eliminarComentario(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }

}
