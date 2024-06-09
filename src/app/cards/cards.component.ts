import { Component, ElementRef, ViewChild } from '@angular/core';
import { tourService } from '../service/tour.service';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioLoggedService } from '../service/usuario-logged.service';
import { Tour } from '../models/tour';
import { Usuario } from '../models/usuario';
import { Reserva } from '../models/reserva';
import { ReservaService } from '../service/reserva.service';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertMessagesModule, AlertMessagesService } from 'jjwins-angular-alert-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [FormsModule, AlertMessagesModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {

  @ViewChild("reservaForm") reservaForm: NgForm
  @ViewChild("botonCerrarReserva") botonCerrarReserva: ElementRef

  tours: Tour[];
  usuarios: Usuario[];
  reservas: Reserva[];
  mensaje: string

  reserva: Reserva = new Reserva();
  tour: Tour = new Tour();

  constructor(
    private usuarioService: UsuarioService,
    private tourService: tourService,
    private usuarioLoggedService: UsuarioLoggedService,
    private reservaService: ReservaService,
    private router: Router,
    private alertMessage: AlertMessagesService
  ) { }

  ngOnInit() {
    this.obtenerTours();
    this.obtenerReservas();
  }

  images: string[] = [
    'assets/img/Zicatela-Galery.jpg',
    'assets/img/AguaTermal-Galery.jpg',
    'assets/img/HierveAgua-Galery.jpg',
    'assets/img/HierveAgua-Galery.jpg',
    'assets/img/HierveAgua-Galery.jpg',
  ];

  getImageForTour(index: number): string {
    return this.images[index % this.images.length];
  }

  private obtenerTours() {
    this.tourService.obtenerTours().subscribe(
      (datos => {
        this.tours = datos;
        console.log(datos)
      })
    );
  }

  private obtenerReservas() {
    this.reservaService.obtenerReservas().subscribe(
      (datos => {
        this.reservas = datos;
        console.log(datos)
      })
    );
  }

  usuarioLogeado(): boolean {
    return this.usuarioLoggedService.getIsLogin();
  }

  // Método para calcular la cantidad de lugares disponibles
  getLugaresDisponibles(): number {

    const reservasConfirmadas = this.reservas.filter(reserva => reserva.tour.idTour === this.reserva.tour.idTour && reserva.estado.toLowerCase() === 'confirmada');

    const cantidadReservada = reservasConfirmadas.reduce((total, reserva) => total + reserva.cantidad, 0);
    return this.reserva.tour.capacidadMax - cantidadReservada;
  }

  prepararOrden(tour: Tour) {
    this.tour = tour;
    this.reserva.tour = tour;
    this.reserva.usuario = this.usuarioLoggedService.getUsuario();
    this.reserva.estado = 'Pendiente'
  }

  agregarOrden() {
    //verificar que el tour no este ya lelno por muchas reservas
    let disponibles = this.getLugaresDisponibles();
    console.log('lugares disponibles: ' + disponibles)
    if (this.reserva.cantidad > disponibles) {
      this.alertMessage.show(`Lugares disponibles ${disponibles}`, { cssClass: 'alert alert-danger', timeOut: 3000 })
      return;
    }

    this.reservaService.agregarReserva(this.reserva).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/pagina-principal']).then(() => {
            this.obtenerReservas();
            this.alertMessage.show('Se ha agregado correctamente la reserva!!!', { cssClass: 'alert alert-success', timeOut: 3000 })
            console.log('reserva agregada')
            this.reservaForm.resetForm();
            setTimeout(() => {
              this.botonCerrarReserva.nativeElement.click();
          }, 3000);
          })

        },
        error: (error: any) => { console.log(error) }
      }
    );
  }


}
