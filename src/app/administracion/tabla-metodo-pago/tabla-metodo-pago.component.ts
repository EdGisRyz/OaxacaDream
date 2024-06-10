import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertMessagesModule, AlertMessagesService } from 'jjwins-angular-alert-messages';
import { tourService } from '../../service/tour.service';
import { UsuarioLoggedService } from '../../service/usuario-logged.service';
import { Router } from '@angular/router';
import { MetodoPago } from '../../models/metodo-pago';
import { MetodoPagoService } from '../../service/metodo-pago.service';

@Component({
  selector: 'app-tabla-metodo-pago',
  standalone: true,
  imports: [AlertMessagesModule, DatePipe, FormsModule],
  templateUrl: './tabla-metodo-pago.component.html',
  styleUrl: './tabla-metodo-pago.component.css'
})
export class TablaMetodoPagoComponent {

  @ViewChild('botonCerrarMetodo') botonCerrarMetodo: ElementRef;
  @ViewChild('metodoForm') metodoForm: NgForm;

  metodoPago: MetodoPago = new MetodoPago();
  metodosPago : MetodoPago[];

  constructor(
    private usuarioLoggedService: UsuarioLoggedService,
    private router: Router,
    private alertMessage: AlertMessagesService,
    private metodoPagoService: MetodoPagoService
  ) { }

  ngOnInit() {
    this.obtenerMetodosPago();
  }

  private obtenerMetodosPago() {
    this.metodoPagoService.obtenerMetodos().subscribe(
      (datos => {
        this.metodosPago = datos;
        console.log(datos)
      })
    );
  }

  limpiarDatosMetodoPago(){
    this.metodoPago = new MetodoPago();
  }

  nuevoMetodoPago(){

  }

  accionMetodoPago(){
    if(this.metodoPago.idMetodoPago === 0){
      this.agregarMetodoPago(this.metodoPago);
    } else {
      this.editarMetodoPago(this.metodoPago);
    }
    
  }

  eliminarMetodoPago(metodoPago: MetodoPago, event: Event){
    event.preventDefault();
    event.stopPropagation();

    console.log('eliminar')
    console.log(metodoPago)

    this.metodoPagoService.eliminarMetodo(metodoPago.idMetodoPago).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerMetodosPago();
            this.alertMessage.show('Metodo de Pago Eliminado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('Metodo Pago eliminado')
            this.metodoForm.resetForm();
            setTimeout(() => {
              this.botonCerrarMetodo.nativeElement.click();
              this.limpiarDatosMetodoPago()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  editarMetodoPago(metodoPago: MetodoPago){
    console.log('editar')
    console.log(metodoPago)

    this.metodoPagoService.editarMetodo(metodoPago.idMetodoPago, metodoPago).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerMetodosPago();
            this.alertMessage.show('Metodo Pago Editado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('Metodo de Pago editado')
            this.metodoForm.resetForm();
            setTimeout(() => {
              this.botonCerrarMetodo.nativeElement.click();
              this.limpiarDatosMetodoPago()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  agregarMetodoPago(metodoPago: MetodoPago){
    console.log('agregar')
    console.log(metodoPago)

    this.metodoPagoService.agregarMetodo(metodoPago).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerMetodosPago();
            this.alertMessage.show('Metodo de Pago Agregado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('Metodo de Pago agregado')
            this.metodoForm.resetForm();
            setTimeout(() => {
              this.botonCerrarMetodo.nativeElement.click();
              this.limpiarDatosMetodoPago()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  prepararMetodopago(metodoPago: MetodoPago){
    this.metodoPago = metodoPago;
  }

}
