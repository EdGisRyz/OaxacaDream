import { Component, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioListaComponent } from "./usuario-lista/usuario-lista.component";
import { TourListaComponent } from "./tour-lista/tour-lista.component";
import { Usuario } from './models/usuario';
import { UsuarioService } from './service/usuario.service';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { tourService } from './service/tour.service';
import { Tour } from './models/tour';
import { UsuarioLoggedService } from './service/usuario-logged.service';
import { CardsComponent } from './cards/cards.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, UsuarioListaComponent, TourListaComponent, 
      FormsModule, CommonModule, NavbarComponent, CardsComponent ]
})

export class AppComponent {
  constructor(private usuariosServicio: UsuarioService, 
    private tourServicio: tourService, private usuarioLoggedService: UsuarioLoggedService){}
 

  usuarioLogeado():boolean{
    return this.usuarioLoggedService.getIsLogin();
  }

  suscribirse(idTour: number): void {
    console.log(`Suscribirse al tour con ID: ${idTour}`);
    // Aquí puedes agregar la lógica para suscribirse al tour,
    // como llamar a un servicio que maneje la suscripción.


  }

  reloadPage() {
    window.location.reload();
  }

  sesion = false;

  //Obtener Tours
  tours: Tour[];

  private obtenerTours(){
    // Consumir los datos del observable (suscribirnos)
    this.tourServicio.obtenerToursLista().subscribe(
      (datos => {
        this.tours = datos;
      })
    );
  }


  //Obtener Usuarios  
  usuarios: Usuario[];


  ngOnInit(){
    //cargamos los usuarios
    this.obtenerUsuarios();
    //cargamos los usuarios
    this.obtenerTours();
  }

  private obtenerUsuarios(){
    // Consumir los datos del observable (suscribirnos)
    this.usuariosServicio.obtenerUsuariosLista().subscribe(
      (datos => {
        this.usuarios = datos;
      })
    );
  }

  //Modales

  loginModalVisible = false;
  acercaDeModalVisible = false;
  misViajesModalVisible = false;

    // Variables para el formulario de inicio de sesión
    username: string = '';
    password: string = '';

  openModal(modalName: string) {
    if (modalName === 'Login') {
      this.loginModalVisible = true;
    } else if (modalName === 'Acerca de') {
      this.acercaDeModalVisible = true;
    } else if (modalName === 'Mis Viajes') {
      this.misViajesModalVisible = true;
    }
  }

  closeModal(modalName: string) {
    if (modalName === 'Login') {
      this.loginModalVisible = false;
    } else if (modalName === 'Acerca de') {
      this.acercaDeModalVisible = false;
    } else if (modalName === 'Mis Viajes') {
      this.misViajesModalVisible = false;
    }
  }

}
