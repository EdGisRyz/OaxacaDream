import { Component } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [],
  templateUrl: './usuario-lista.component.html'
})
export class UsuarioListaComponent {
  usuarios: Usuario[];

  constructor(private usuariosServicio: UsuarioService ){}

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
  
}
