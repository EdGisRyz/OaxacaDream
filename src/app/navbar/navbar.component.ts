import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../service/usuario.service';
import { Usuario } from '../models/usuario';
import { Router } from '@angular/router';
import { UsuarioLoggedService } from '../service/usuario-logged.service';
import { Tour } from '../models/tour';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @ViewChild("loginForm") loginForm: NgForm
  @ViewChild("botonCerrarLogin") btnCerrarLogin: ElementRef

  tours: Tour[]
  
  usuarios: Usuario[]

  correo_Electronico: string;
  contrasena: string;

  usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router, 
    private usuarioLoggedService: UsuarioLoggedService
  ) { }

  ngOnInit(){
    //cargamos los usuarios
    this.obtenerUsuarios();
    this.tours = this.usuarioLoggedService.getUsuario().tours
  }

  

  eliminarTour(id: number) {
    let user = this.usuarioLoggedService.getUsuario();
    let tours = user.tours;
  
    // Filtrar la lista de tours para excluir el tour con el ID especificado
    user.tours = tours.filter(tour => tour.idTour !== id);
  
    // Actualizar el usuario en el servicio
    this.usuarioService.editarusuarioTour(user.idUsuario, user).subscribe({
      next: (datos) => {
        console.log(datos);
        this.usuarioLoggedService.setUsuario(user);
        this.tours = this.usuarioLoggedService.getUsuario().tours
      },
      error: (errores) => console.log(errores)
    });
  }

  hayToursUsuario(){
    return this.usuarioLoggedService.getUsuario().tours.length > 0  
  }
  
  totalPago(){
    if(!this.hayToursUsuario()){
      return
    }
    let total = 0
    for(let tour of this.usuarioLoggedService.getUsuario().tours){
      total += tour.precio
    }
    return total
  }

  usuarioTours(){
    console.log(this.usuarioLoggedService.getUsuario())
    return this.usuarioLoggedService.getUsuario().tours
  }

  private obtenerUsuarios() {
    this.usuarioService.obtenerUsuariosLista().subscribe(
      (datos => {
        this.usuarios = datos;
        console.log(datos)
      })
    );
  }

  cerrarSesion(){
    this.usuarioLoggedService.setIsLogin(false);
  }

  usuarioLogeado():boolean{
    return this.usuarioLoggedService.getIsLogin();
  }
  
  login() {
    let encontrado = false
    console.log(this.correo_Electronico);
    console.log(this.contrasena)
    this.usuarios.forEach(usuario => {
      if (this.correo_Electronico === usuario.correo_Electronico && this.contrasena == usuario.contrasena) {
        //este usuario se actualiza en el servicio
        this.usuario = usuario;
        console.log('puedes entrar');
        console.log(usuario.correo_Electronico)
        console.log(usuario.contrasena)
        console.log(usuario)
        this.usuarioLoggedService.setUsuario(usuario);
        this.usuarioLoggedService.setIsLogin(true);

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
      this.correo_Electronico = ''
      this.contrasena = ''
    }

  }

  reloadPage() {
    window.location.reload();
  }

  
}
