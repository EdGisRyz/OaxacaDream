import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../models/usuario';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UsuarioLoggedService } from '../service/usuario-logged.service';
import { Tour } from '../models/tour';
import { Reserva } from '../models/reserva';
import { tourService } from '../service/tour.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @ViewChild("loginForm") loginForm: NgForm
  @ViewChild("botonCerrarLogin") btnCerrarLogin: ElementRef


  usuario: Usuario = new Usuario();
  tour: Tour = new Tour();
  reserva: Reserva = new Reserva();

  usuarios: Usuario[];
  tours: Tour[];
  reservas: Reserva[];


  email: string;
  contrasena: string;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private usuarioLoggedService: UsuarioLoggedService,
  ) { }

  ngOnInit() {
    this.obtenerUsuarios();
  }

  private obtenerUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (datos => {
        this.usuarios = datos;
        console.log(datos);
      })
    );
  }

  cerrarSesion() {
    this.usuarioLoggedService.setIsLogin(false);
    this.router.navigate(['/pagina-principal'])
  }

  usuarioLogeado(): boolean {
    return this.usuarioLoggedService.getIsLogin();
  }

  tipoUsuario(): string {
    return this.usuarioLoggedService.getUsuario().tipo.toLowerCase();
  }

  login() {
    let encontrado = false
    console.log(this.email);
    console.log(this.contrasena)
    this.usuarios.forEach(usuario => {
      if (this.email === usuario.email && this.contrasena == usuario.contrasena) {

        this.usuario = usuario;
        console.log('puedes entrar');
        console.log(usuario)
        this.usuarioLoggedService.setUsuario(usuario);
        this.usuarioLoggedService.setIsLogin(true);

        if (usuario.tipo === 'cliente') {
            this.router.navigate(['/pagina-principal']);
        }
        //este actualiza la variable bool para login
        encontrado = true
        //cerramos el modal
        this.loginForm.resetForm();
        this.btnCerrarLogin.nativeElement.click();
        return
      }
    })

    if (!encontrado) {
      console.log('no encontrado')
      // this.alertMessage.show('Verifica tu usuario y contraseña', { cssClass: 'alert alert-warning', timeOut: 3000 })
      this.email = ''
      this.contrasena = ''
    }

  }

  reloadPage() {
    window.location.reload();
  }


}
