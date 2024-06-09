import { Component } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
import { tourService } from '../service/tour.service';
import { UsuarioLoggedService } from '../service/usuario-logged.service';
import { Tour } from '../models/tour';
import { Usuario } from '../models/usuario';
import { RouterOutlet } from '@angular/router';
import { UsuarioListaComponent } from '../usuario-lista/usuario-lista.component';
import { TourListaComponent } from '../tour-lista/tour-lista.component';
import { CardsComponent } from '../cards/cards.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagina-principal',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CardsComponent ],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

  constructor(){}
 

}
