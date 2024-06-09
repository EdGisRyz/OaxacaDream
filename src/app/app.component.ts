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
    imports: [RouterOutlet ]
})

export class AppComponent {
  constructor(){}
 
  reloadPage() {
    window.location.reload();
  }


}
