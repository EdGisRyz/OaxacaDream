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
import { ImgPagoService } from '../service/img-pago.service';

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

  @ViewChild("comprobanteForm") comprobanteForm: NgForm
  @ViewChild("botonCerrarComprobante") botonCerrarComprobante: ElementRef

  reservas: Reserva[];
  reserva: Reserva = new Reserva();

  metodos: MetodoPago[]

  pago: Pago = new Pago();

  pagos: Pago[];

  imagenUrl: string; // Variable para almacenar la URL de la imagen
  archivoSeleccionado: File | null = null;
  previewUrl: string | null = null;

  tabla: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private tourService: tourService,
    private usuarioLoggedService: UsuarioLoggedService,
    private reservaService: ReservaService,
    private router: Router,
    private alertMessage: AlertMessagesService,
    private metodoPagoService: MetodoPagoService,
    private pagoService: PagoService,
    private imgPagoService: ImgPagoService
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

  cancelarReserva(reservaValidacion: Reserva) {
    this.tabla = 'reserva'
    reservaValidacion.estado = 'Cancelada';

    this.reservaService.editarReserva(reservaValidacion.idReserva, reservaValidacion).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/reservas']).then(() => {
            this.obtenerReservas();
            console.log(datos);
            if (this.reservaTienePago(reservaValidacion)) {
              let pagoCancelado = this.obtenerPagoAsociadoReserva(reservaValidacion);
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

  validadrReserva(reservaValidacion: Reserva) {
    this.tabla = 'reserva'
    reservaValidacion.estado = 'En validacion';

    this.reservaService.editarReserva(reservaValidacion.idReserva, reservaValidacion).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/reservas']).then(() => {
            this.obtenerReservas();
            console.log(datos);
            this.alertMessage.show('Reserva Validando', { cssClass: 'alert alert-danger', timeOut: 3000 })
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

  reservaTienePago(reserva: Reserva): boolean {
    return this.pagos.some(pago => 
      pago.reserva.idReserva === reserva.idReserva && 
      pago.estado.toLowerCase() !== 'cancelada' 
    );
  }

  // Método para obtener el pago asociado a una reserva
  obtenerPagoAsociadoReserva(reservaValidacion: Reserva): Pago | undefined {
    return this.pagos.find(pago => pago.reserva.idReserva === reservaValidacion.idReserva && pago.estado.toLowerCase() === 'pendiente');
  }

  agregarPago() {
    this.tabla = 'pago'
    console.log('validamos pago')
    if (this.reservaTienePago(this.pago.reserva)) {
      this.alertMessage.show('Esta Reserva ya tiene una orden de pago!!!', { cssClass: 'alert alert-danger', timeOut: 3000 })
      console.log('No se puede generar otra')
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
    this.tabla = 'pago'
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

  

  limpiarImagenes(){
    this.imagenUrl = "";
    this.previewUrl = '';
  }

  finalizarPago(pagoFinal: Pago) {
    this.pago = pagoFinal;
    this.obtenerImagenPrenda(pagoFinal.idPago);

  }

  accionEditar(){
    this.editarPago(this.pago);
  }

  editarPago(pago: Pago){
    this.tabla = 'pago'
    console.log('editar')
    console.log(pago)

    pago.estado = "En validacion"

    this.pagoService.editarPago(pago.idPago, pago).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/reservas']).then(() => {
            this.obtenerPagos();
            this.obtenerReservas();
            this.alertMessage.show('Comprobante subido con exito', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('pago editada')
            this.comprobanteForm.resetForm();
            console.log(this.archivoSeleccionado)
            if (this.archivoSeleccionado != null) {
              this.subirImagenPrenda(pago.idPago);
              console.log('imagen cambiada');
            }
            this.validadrReserva(pago.reserva);
            setTimeout(() => {
              this.botonCerrarComprobante.nativeElement.click();
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  obtenerImagenPrenda(idPago: number): void {
    console.log('vamos a intentar ver la imagen')
    this.imgPagoService.obtenerImagenPago(idPago).subscribe(
      imagen => {
        // Convierte la imagen en una URL para mostrarla en el HTML
        const reader = new FileReader();
        reader.onloadend = () => {
          this.imagenUrl = reader.result as string;
        };
        reader.readAsDataURL(imagen);
      },
      error => console.error('Error al obtener imagen de la prenda: ', error)
    );
    console.log(this.imagenUrl)
  }

  subirImagenPrenda(idPago: number): void {
    // Asegúrate de que la prenda tenga un ID válido
    if (!idPago) {
      console.error('La prenda no tiene un ID válido.');
      return;
    }

    // Llama al servicio para agregar la imagen a la prenda en la base de datos
    if (this.archivoSeleccionado == null) {
      console.log('no se selecciono un archivo')
      return;
    }
    this.imgPagoService.agregarImagenPago(idPago, this.archivoSeleccionado).subscribe(
      response => {
        console.log('Imagen agregada correctamente a la prenda.');
        // Aquí puedes hacer lo que necesites después de subir la imagen
      },
      error => console.error('Error al subir la imagen a la prenda: ', error)
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      // Almacena el archivo seleccionado en la variable archivoSeleccionado
      this.archivoSeleccionado = input.files[0];

      // Generar una URL de vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.archivoSeleccionado);

      // reader.readAsArrayBuffer(this.archivoSeleccionado);
    }
  }

}
