import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertMessagesModule, AlertMessagesService } from 'jjwins-angular-alert-messages';
import { Reserva } from '../../models/reserva';
import { tourService } from '../../service/tour.service';
import { UsuarioLoggedService } from '../../service/usuario-logged.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../models/usuario';
import { Tour } from '../../models/tour';
import { ReservaService } from '../../service/reserva.service';

@Component({
  selector: 'app-tabla-reserva',
  standalone: true,
  imports: [AlertMessagesModule, DatePipe, FormsModule, CommonModule],
  templateUrl: './tabla-reserva.component.html',
  styleUrl: './tabla-reserva.component.css'
})
export class TablaReservaComponent {

  @ViewChild('botonCerrarReserva') botonCerrarReserva: ElementRef;
  @ViewChild('reservaForm') reservaForm: NgForm;

  reserva: Reserva = new Reserva();
  reservas: Reserva[];

  usuario: Usuario = new Usuario();
  tour: Tour = new Tour();

  usuariosCliente : Usuario[];
  tours: Tour[];

  constructor(
    private tourService: tourService,
    private usuarioService: UsuarioService,
    private usuarioLoggedService: UsuarioLoggedService,
    private router: Router,
    private alertMessage: AlertMessagesService,
    private reservaService: ReservaService
  ) { }

  ngOnInit() {
    this.obtenerReservas();
    this.obtenerTours();
    this.obtenerUsuarioCliente();
  }

  private obtenerReservas() {
    this.reservaService.obtenerReservas().subscribe(
      (datos => {
        this.reservas = datos;
        console.log(datos)
      })
    );
  }

  private obtenerTours() {
    this.tourService.obtenerTours().subscribe(
      (datos => {
        this.tours = datos;
        console.log(datos)
      })
    );
  }

  private obtenerUsuarioCliente() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (datos => {
        this.usuariosCliente = datos.filter(usuario => usuario.tipo.toLowerCase() === 'cliente');
        console.log(datos)
      })
    );
  }

  limpiarDatosReserva(){
    this.reserva = new Reserva();
  }

  nuevaReserva(){
    this.reserva.estado = 'Pendiente';

  }

  accionReserva(){
    console.log(this.reserva);
    if(this.reserva.idReserva === 0){
      this.agregarReserva(this.reserva);
    } else {
      this.editarReserva(this.reserva);
    }
    
  }

  eliminarReserva(reserva: Reserva, event: Event){
    event.preventDefault();
    event.stopPropagation();

    console.log('eliminar')
    console.log(reserva)

    this.reservaService.eliminarReserva(reserva.idReserva).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerReservas();
            this.alertMessage.show('Reserva Eliminada', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('Reserva eliminado')
            this.reservaForm.resetForm();
            setTimeout(() => {
              this.botonCerrarReserva.nativeElement.click();
              this.limpiarDatosReserva()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  getLugaresDisponibles(tour: Tour, reservas: Reserva[]): number {
    const reservasConfirmadas = reservas.filter(reserva => reserva.tour.idTour === tour.idTour && reserva.estado === 'confirmada');
    const cantidadReservada = reservasConfirmadas.reduce((total, reserva) => total + reserva.cantidad, 0);
    return tour.capacidadMax - cantidadReservada;
  }

  getExisteReservaUsuarioTour(): boolean {
    return this.reservas.some( reserva => reserva.tour.idTour === this.reserva.tour.idTour && reserva.usuario.idUsuario === this.reserva.usuario.idUsuario);
  }

  editarReserva(reserva: Reserva){
    console.log('editar')
    console.log(reserva)

    let disponibles = this.getLugaresDisponibles(this.reserva.tour, this.reservas);
    if(disponibles < this.reserva.cantidad){
      console.log('fuera de rango: disponbiles: ' + disponibles)
      this.alertMessage.show('Espacios Disponibles: ' + disponibles, { cssClass: 'alert alert-danger', timeOut: 2000 })
      return;
    }

    this.reservaService.editarReserva(reserva.idReserva, reserva).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerReservas();
            this.alertMessage.show('Reserva Editada', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('reserva editada')
            this.reservaForm.resetForm();
            setTimeout(() => {
              this.botonCerrarReserva.nativeElement.click();
              this.limpiarDatosReserva()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  agregarReserva(reserva: Reserva){
    console.log('agregar')
    console.log(reserva)

    if(this.getExisteReservaUsuarioTour()){
      console.log('El usuario y tour ya tiene una reserva');
      this.alertMessage.show('El usuario cuenta con una reserva para el tour ', { cssClass: 'alert alert-warning', timeOut: 2000 })
      return
    }

    let disponibles = this.getLugaresDisponibles(this.reserva.tour, this.reservas);
    if(disponibles < this.reserva.cantidad){
      console.log('fuera de rango: disponbiles: ' + disponibles)
      this.alertMessage.show('Espacios Disponibles: ' + disponibles, { cssClass: 'alert alert-danger', timeOut: 2000 })
      return;
    }

    this.reservaService.agregarReserva(reserva).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerReservas();
            this.alertMessage.show('Reserva Agregada', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('reserva agregada')
            this.reservaForm.resetForm();
            setTimeout(() => {
              this.botonCerrarReserva.nativeElement.click();
              this.limpiarDatosReserva()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  prepararReserva(reserva: Reserva){
    this.reserva = reserva;
    console.log(reserva)
  }

}
