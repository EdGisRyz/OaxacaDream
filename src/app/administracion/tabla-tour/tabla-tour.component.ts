import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertMessagesModule, AlertMessagesService } from 'jjwins-angular-alert-messages';
import { Tour } from '../../models/tour';
import { tourService } from '../../service/tour.service';
import { UsuarioLoggedService } from '../../service/usuario-logged.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabla-tour',
  standalone: true,
  imports: [AlertMessagesModule, DatePipe, FormsModule, CommonModule],
  templateUrl: './tabla-tour.component.html',
  styleUrl: './tabla-tour.component.css'
})
export class TablaTourComponent {

  @ViewChild('botonCerrarTour') botonCerrarTour: ElementRef;
  @ViewChild('tourForm') tourForm: NgForm;

  tour: Tour = new Tour();
  tours: Tour[];

  constructor(
    private tourService: tourService,
    private usuarioLoggedService: UsuarioLoggedService,
    private router: Router,
    private alertMessage: AlertMessagesService,
  ) { }

  ngOnInit() {
    this.obtenerTours();
  }

  private obtenerTours() {
    this.tourService.obtenerTours().subscribe(
      (datos => {
        this.tours = datos;
        console.log(datos)
      })
    );
  }

  limpiarDatosTour(){
    this.tour = new Tour();
  }

  nuevoTour(){
    this.tour.fechaCreacion = new Date();

  }

  accionTour(){
    if(this.tour.idTour === 0){
      this.agregarTour(this.tour);
    } else {
      this.editarTour(this.tour);
    }
    
  }

  eliminarTour(tour: Tour, event: Event){
    event.preventDefault();
    event.stopPropagation();

    console.log('eliminar')
    console.log(tour)

    this.tourService.eliminarTour(tour.idTour).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerTours();
            this.alertMessage.show('Tour Eliminado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('Tour eliminado')
            this.tourForm.resetForm();
            setTimeout(() => {
              this.botonCerrarTour.nativeElement.click();
              this.limpiarDatosTour()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  editarTour(tour: Tour){
    console.log('editar')
    console.log(tour)

    this.tourService.editarTour(tour.idTour, tour).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerTours();
            this.alertMessage.show('Tour Editado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('usuario editado')
            this.tourForm.resetForm();
            setTimeout(() => {
              this.botonCerrarTour.nativeElement.click();
              this.limpiarDatosTour()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  agregarTour(tour: Tour){
    console.log('agregar')
    console.log(tour)

    this.tourService.agregarTour(tour).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerTours();
            this.alertMessage.show('Tour Agregado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('usuario agregado')
            this.tourForm.resetForm();
            setTimeout(() => {
              this.botonCerrarTour.nativeElement.click();
              this.limpiarDatosTour()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  prepararTour(tour: Tour){
    this.tour = tour;
  }
  

}
