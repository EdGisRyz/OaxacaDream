import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaUsuarioComponent } from './tabla-usuario/tabla-usuario.component';
import { TablaTourComponent } from './tabla-tour/tabla-tour.component';
import { TablaReservaComponent } from './tabla-reserva/tabla-reserva.component';
import { TablaMetodoPagoComponent } from './tabla-metodo-pago/tabla-metodo-pago.component';
import { TablaPagoComponent } from './tabla-pago/tabla-pago.component';
import { Comentario } from '../models/comentario';
import { ComentarioComponent } from './comentario/comentario.component';
import { EmpresaComponent } from './empresa/empresa.component';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [NavbarComponent, TablaUsuarioComponent, TablaTourComponent, TablaReservaComponent, TablaMetodoPagoComponent, TablaPagoComponent, ComentarioComponent, EmpresaComponent],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  
}
