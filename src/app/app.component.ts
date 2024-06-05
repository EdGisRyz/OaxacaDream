import { Component, Input, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioListaComponent } from "./usuario-lista/usuario-lista.component";
import { TourListaComponent } from "./tour-lista/tour-lista.component";
import { Usuario } from './models/usuario';
import { UsuarioService } from './service/usuario.service';
import { FormsModule, NgModel } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, UsuarioListaComponent, TourListaComponent, FormsModule, CommonModule ]
})

export class AppComponent {
  title = 'OaxacaDreams';

  reloadPage() {
    window.location.reload();
  }


  sesion = false;
    
  usuarios: Usuario[];

  constructor(private usuariosServicio: UsuarioService){}

  ngOnInit(){
    //cargamos los usuarios
    this.obtenerUsuarios();
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
