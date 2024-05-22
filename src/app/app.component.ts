import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioListaComponent } from "./usuario-lista/usuario-lista.component";
import { PlantillaComponent } from './plantilla/plantilla.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, UsuarioListaComponent, PlantillaComponent]
})
export class AppComponent {

  title = 'OaxacaDreams';

  sesion = false;
  

}
