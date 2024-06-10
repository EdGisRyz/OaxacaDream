import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImgPagoService {

  private urlBase = "http://localhost:8080/oaxacaDream-app/img-pago"

  constructor(private clienteHttp: HttpClient) { }

  // Agregar imagen a una prenda
  agregarImagenPago(id: number, imagen: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('image', imagen, imagen.name);
    return this.clienteHttp.put(`${this.urlBase}/${id}`, formData);
  }

  // Obtener imagen de una prenda por su ID
  obtenerImagenPago(id: number): Observable<Blob> {
    return this.clienteHttp.get(`${this.urlBase}/${id}`, { responseType: 'blob' });
  }

}
