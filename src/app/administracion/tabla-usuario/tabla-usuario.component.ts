import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Reserva } from '../../models/reserva';
import { MetodoPago } from '../../models/metodo-pago';
import { Pago } from '../../models/pago';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../service/usuario.service';
import { tourService } from '../../service/tour.service';
import { UsuarioLoggedService } from '../../service/usuario-logged.service';
import { ReservaService } from '../../service/reserva.service';
import { Router } from '@angular/router';
import { AlertMessagesModule, AlertMessagesService } from 'jjwins-angular-alert-messages';
import { MetodoPagoService } from '../../service/metodo-pago.service';
import { PagoService } from '../../service/pago.service';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-tabla-usuario',
  standalone: true,
  imports: [AlertMessagesModule, DatePipe, FormsModule, CommonModule],
  templateUrl: './tabla-usuario.component.html',
  styleUrl: './tabla-usuario.component.css'
})
export class TablaUsuarioComponent {

  @ViewChild('botonCerrarUsuario') botonCerrarUsuario: ElementRef;
  @ViewChild('usuarioForm') usuarioForm: NgForm;

  reservas: Reserva[];
  reserva: Reserva = new Reserva();

  metodos: MetodoPago[]

  pago: Pago = new Pago();
  pagos: Pago[];

  usuario: Usuario = new Usuario();
  usuariosAdmin: Usuario[]
  usuariosCliente: Usuario[]


  constructor(
    private usuarioService: UsuarioService,
    private tourService: tourService,
    private usuarioLoggedService: UsuarioLoggedService,
    private reservaService: ReservaService,
    private router: Router,
    private alertMessage: AlertMessagesService,
    private metodoPagoService: MetodoPagoService,
    private pagoService: PagoService
  ) { }

  ngOnInit() {
    this.obtenerUsuariosAdmin();
    this.obtenerUsuarioCliente();
    // this.obtenerReservas();
    // this.obtenerMetodosPago();
    // this.obtenerPagos();
  }

  private obtenerUsuariosAdmin() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (datos => {
        this.usuariosAdmin = datos.filter(usuario => usuario.tipo.toLowerCase() === 'administrador');
        console.log(datos)
      })
    );
  }

  private obtenerUsuarioCliente() {
    this.usuarioService.obtenerUsuarios().subscribe(
      (datos => {
        this.usuariosCliente = datos.filter(usuario => usuario.tipo.toLowerCase() === 'cliente');
        console.log(datos)
      })
    );
  }

  // private obtenerReservas() {
  //   this.reservaService.obtenerReservas().subscribe(
  //     (datos => {
  //       this.reservas = datos;
  //       console.log(datos)
  //     })
  //   );
  // }

  // private obtenerMetodosPago() {
  //   this.metodoPagoService.obtenerMetodos().subscribe(
  //     (datos => {
  //       this.metodos = datos;
  //       console.log(datos)
  //     })
  //   );
  // }

  // private obtenerPagos() {
  //   this.pagoService.obtenerPagos().subscribe(
  //     (datos => {
  //       this.pagos = datos;
  //       console.log(datos)
  //     })
  //   );
  // }

  limpiarDatosUsuario(){
    this.usuario = new Usuario();
  }

  nuevoUsuario(tipo: string){

    this.usuario.tipo = tipo;

  }

  accionUsuario(){
    if(this.usuario.idUsuario === 0){
      this.agregarUsuario(this.usuario);
    } else {
      this.editarUsuario(this.usuario);
    }
    
  }

  eliminarUsuario(usuario: Usuario, event: Event){
    event.preventDefault();
    event.stopPropagation();

    console.log('eliminar')
    console.log(usuario)

    this.usuarioService.eliminarUsuario(usuario.idUsuario).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerUsuariosAdmin();
            this.obtenerUsuarioCliente();
            this.alertMessage.show('Usuario Eliminado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('usuario eliminado')
            this.usuarioForm.resetForm();
            setTimeout(() => {
              this.botonCerrarUsuario.nativeElement.click();
              this.limpiarDatosUsuario()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  editarUsuario(usuario: Usuario){
    console.log('editar')
    console.log(usuario)

    this.usuarioService.editarUsuario(usuario.idUsuario, usuario).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerUsuariosAdmin();
            this.obtenerUsuarioCliente();
            this.alertMessage.show('Usuario Editado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('usuario editado')
            this.usuarioForm.resetForm();
            setTimeout(() => {
              this.botonCerrarUsuario.nativeElement.click();
              this.limpiarDatosUsuario()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  agregarUsuario(usuario: Usuario){
    console.log('agregar')
    console.log(usuario)

    this.usuarioService.agregarUsuario(usuario).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerUsuariosAdmin();
            this.obtenerUsuarioCliente();
            this.alertMessage.show('Usuario Agregado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('usuario agregado')
            this.usuarioForm.resetForm();
            setTimeout(() => {
              this.botonCerrarUsuario.nativeElement.click();
              this.limpiarDatosUsuario()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  prepararUsuario(usuario: Usuario){
    this.usuario = usuario;
  }


}
