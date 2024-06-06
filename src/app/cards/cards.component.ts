import { Component } from '@angular/core';
import { tourService } from '../service/tour.service';
import { UsuarioService } from '../service/usuario.service';
import { UsuarioLoggedService } from '../service/usuario-logged.service';
import { Tour } from '../models/tour';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})
export class CardsComponent {
  //Obtener Tours
  tours: Tour[];
  //Obtener Usuarios
  usuarios: Usuario[];

  mensaje: string

  constructor(
    private usuariosServicio: UsuarioService,
    private tourServicio: tourService,
    private usuarioLoggedService: UsuarioLoggedService
  ) {}

  ngOnInit() {
    //cargamos los usuarios
    this.obtenerUsuarios();
    //cargamos los usuarios
    this.obtenerTours();
  }

  images: string[] = [
    'assets/img/Zicatela-Galery.jpg',
    'assets/img/AguaTermal-Galery.jpg',
    'assets/img/HierveAgua-Galery.jpg',
    // Agrega más URLs de imágenes aquí
  ];

  getImageForTour(index: number): string {
    return this.images[index % this.images.length];
  }

  private obtenerTours() {
    // Consumir los datos del observable (suscribirnos)
    this.tourServicio.obtenerToursLista().subscribe((datos) => {
      this.tours = datos;
    });
  }

  private obtenerUsuarios() {
    // Consumir los datos del observable (suscribirnos)
    this.usuariosServicio.obtenerUsuariosLista().subscribe((datos) => {
      this.usuarios = datos;
    });
  }

  usuarioLogeado(): boolean {
    return this.usuarioLoggedService.getIsLogin();
  }

  suscribirse(idTour: number): void {
    console.log(`Suscribirse al tour con ID: ${idTour}`);
  
    // Buscar el tour por su ID
    let tourSeleccionado = this.tours.find((tour) => tour.idTour === idTour);
    console.log(tourSeleccionado);
  
    if (tourSeleccionado) {
      let user = this.usuarioLoggedService.getUsuario();
      
      // Verificar si el tour ya está en la lista del usuario
      const tourExistente = user.tours.find(tour => tour.idTour === idTour);
      
      if (!tourExistente) {
        user.tours.push(tourSeleccionado);
        
        this.usuariosServicio.editarusuarioTour(user.idUsuario, user).subscribe({
          next: (datos) => {
            console.log(datos);
            this.usuarioLoggedService.setUsuario(user);
            this.mensaje = 'Te has registrado a este viaje correctamente'
          },
          error: (errores) => console.log(errores)
        });
      } else {
        this.mensaje = 'Ya estas suscrito en este viaje'
        console.log(`El tour con ID ${idTour} ya está en la lista del usuario.`);
      }
    } else {
      console.error(`No se encontró ningún tour con el ID: ${idTour}`);
    }
  }
  
}
