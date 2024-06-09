import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empresa } from '../models/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private urlBase = "http://localhost:8080/oaxacaDream-app/empresas";

  constructor(private clienteHttp: HttpClient) { }

  obtenerEmpresas():Observable<Empresa[]> {
    return this.clienteHttp.get<Empresa[]>(this.urlBase);
  }

  agregarEmpresa(empresa: Empresa): Observable<Object>{
    return this.clienteHttp.post(this.urlBase, empresa);
  }

  obtenerEmpresaPorId(id: number){
    return this.clienteHttp.get<Empresa>(`${this.urlBase}/${id}`);
  }

  editarEmpresa(id: number, empresa: Empresa): Observable<Object>{
    return this.clienteHttp.put(`${this.urlBase}/${id}`, empresa);
  }

  eliminarEmpresa(id: number): Observable<Object>{
    return this.clienteHttp.delete(`${this.urlBase}/${id}`);
  }
}
