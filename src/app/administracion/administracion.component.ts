import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { TablaUsuarioComponent } from './tabla-usuario/tabla-usuario.component';
import { TablaTourComponent } from './tabla-tour/tabla-tour.component';
import { TablaReservaComponent } from './tabla-reserva/tabla-reserva.component';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [NavbarComponent, TablaUsuarioComponent, TablaTourComponent, TablaReservaComponent],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  
}
