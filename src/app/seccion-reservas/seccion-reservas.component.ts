import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AlertMessagesModule, AlertMessagesService } from 'jjwins-angular-alert-messages';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../service/reserva.service';
import { UsuarioLoggedService } from '../service/usuario-logged.service';
import { tourService } from '../service/tour.service';
import { UsuarioService } from '../service/usuario.service';
import { Tour } from '../models/tour';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { MetodoPago } from '../models/metodo-pago';
import { MetodoPagoService } from '../service/metodo-pago.service';
import { Pago } from '../models/pago';
import { PagoService } from '../service/pago.service';

@Component({
  selector: 'app-seccion-reservas',
  standalone: true,
  imports: [NavbarComponent, AlertMessagesModule, DatePipe, FormsModule, CommonModule],
  templateUrl: './seccion-reservas.component.html',
  styleUrl: './seccion-reservas.component.css'
})
export class SeccionReservasComponent {

  @ViewChild("pagoForm") pagoForm: NgForm
  @ViewChild("botonCerrarPago") botonCerrarPago: ElementRef

  reservas: Reserva[];
  reserva: Reserva = new Reserva();

  metodos: MetodoPago[]

  pago: Pago = new Pago();

  pagos: Pago[];

  constructor(
    private usuarioService: UsuarioService,
    private tourService: tourService,
    private usuarioLoggedService: UsuarioLoggedService,
    private reservaService: ReservaService,
    private router: Router,
    private alertMessage: AlertMessagesService,
    private metodoPagoService: MetodoPagoService,
    private pagoService: PagoService
  ) { }

  ngOnInit() {
    this.obtenerReservas();
    this.obtenerMetodosPago();
    this.obtenerPagos();
  }

  private obtenerReservas() {
    this.reservaService.obtenerReservas().subscribe(
      (datos => {
        this.reservas = datos.filter(reserva => this.usuarioLoggedService.getUsuario().idUsuario === reserva.usuario.idUsuario);
        console.log(datos)
      })
    );
  }

  private obtenerMetodosPago() {
    this.metodoPagoService.obtenerMetodos().subscribe(
      (datos => {
        this.metodos = datos;
        console.log(datos)
      })
    );
  }

  private obtenerPagos() {
    this.pagoService.obtenerPagos().subscribe(
      (datos => {
        this.pagos = datos.filter(pago => pago.reserva.usuario.idUsuario === this.usuarioLoggedService.getUsuario().idUsuario);
        console.log(datos)
      })
    );
  }

  getLugaresDisponibles(tour: Tour, reservas: Reserva[]): number {
    const reservasConfirmadas = reservas.filter(reserva => reserva.tour.idTour === tour.idTour && reserva.estado === 'confirmada');
    const cantidadReservada = reservasConfirmadas.reduce((total, reserva) => total + reserva.cantidad, 0);
    return tour.capacidadMax - cantidadReservada;
  }

  cancelarReserva(reservaCancelada: Reserva) {

    reservaCancelada.estado = 'Cancelada';

    this.reservaService.editarReserva(reservaCancelada.idReserva, reservaCancelada).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/reservas']).then(() => {
            this.obtenerReservas();
            console.log(datos);
            if (this.reservaTienePago(reservaCancelada)) {
              let pagoCancelado = this.obtenerPagoAsociadoReserva(reservaCancelada);
              if (pagoCancelado !== undefined)
                this.cancelarPago(pagoCancelado);

            }
            this.alertMessage.show('Se ha cancelado la reserva!!!', { cssClass: 'alert alert-danger', timeOut: 3000 })
            console.log('reserva cancelada')
          })

        },
        error: (error: any) => { console.log(error) }
      }
    );

  }

  cargarPago(reserva: Reserva) {
    this.pago.reserva = reserva;
    this.pago.estado = 'Pendiente'
    this.pago.monto = reserva.cantidad * reserva.tour.precio
  }

  // Método para verificar si una reserva ya tiene un pago
  reservaTienePago(reserva: Reserva): boolean {
    return this.pagos.some(pago => pago.reserva.idReserva === reserva.idReserva && pago.estado.toLowerCase() === 'pendiente');
  }

  // Método para obtener el pago asociado a una reserva
  obtenerPagoAsociadoReserva(reservaCancelada: Reserva): Pago | undefined {
    return this.pagos.find(pago => pago.reserva.idReserva === reservaCancelada.idReserva && pago.estado.toLowerCase() === 'pendiente');
  }

  agregarPago() {
    if (this.reservaTienePago(this.pago.reserva)) {
      this.alertMessage.show('Esta Reserva ya tiene una orden de pago!!!', { cssClass: 'alert alert-danger', timeOut: 3000 })
      return;
    }

    this.pagoService.agregarPago(this.pago).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/reservas']).then(() => {
            this.obtenerReservas();
            this.obtenerPagos();
            this.alertMessage.show('Se ha generado la orden de pago!!!', { cssClass: 'alert alert-success', timeOut: 3000 })
            console.log('orden de pago generada')
            this.pagoForm.resetForm();
            setTimeout(() => {
              this.botonCerrarPago.nativeElement.click();
            }, 3000);
          })

        },
        error: (error: any) => { console.log(error) }
      }
    );

  }

  cancelarPago(pagoCandelado: Pago) {
    pagoCandelado.estado = 'Cancelada';

    this.pagoService.editarPago(pagoCandelado.idPago, pagoCandelado).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/reservas']).then(() => {
            this.obtenerReservas();
            this.obtenerPagos();
            console.log(datos);
            this.alertMessage.show('Se ha cancelado el pago!!!', { cssClass: 'alert alert-danger', timeOut: 3000 })
            console.log('pago cancelada')
          })

        },
        error: (error: any) => { console.log(error) }
      }
    );
  }

  finalizarPago(pagoFinal: Pago) {

  }

}
