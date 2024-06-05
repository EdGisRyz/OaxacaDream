import { Component } from '@angular/core';
import { Tour } from '../models/tour';
import { tourService } from '../service/tour.service';

@Component({
  selector: 'app-tour-lista',
  standalone: true,
  imports: [],
  templateUrl: './tour-lista.component.html',
  styleUrl: './tour-lista.component.css'
})
export class TourListaComponent {
  
  tours: Tour[];

  constructor(private tourServicio: tourService ){}

  ngOnInit(){
    //cargamos los usuarios
    this.obtenerTours();
  }

  private obtenerTours(){
    // Consumir los datos del observable (suscribirnos)
    this.tourServicio.obtenerToursLista().subscribe(
      (datos => {
        this.tours = datos;
      })
    );
  }
}
