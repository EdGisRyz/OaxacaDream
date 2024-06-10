import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AlertMessagesModule, AlertMessagesService } from 'jjwins-angular-alert-messages';
import { Pago } from '../../models/pago';
import { UsuarioLoggedService } from '../../service/usuario-logged.service';
import { Router } from '@angular/router';
import { PagoService } from '../../service/pago.service';

@Component({
  selector: 'app-tabla-pago',
  standalone: true,
  imports: [AlertMessagesModule, DatePipe, FormsModule, CommonModule],
  templateUrl: './tabla-pago.component.html',
  styleUrl: './tabla-pago.component.css'
})
export class TablaPagoComponent {

  @ViewChild('botonCerrarPago') botonCerrarPago: ElementRef;
  @ViewChild('pagoForm') pagoForm: NgForm;

  pago: Pago = new Pago();
  pagos: Pago[];

  constructor(
    private usuarioLoggedService: UsuarioLoggedService,
    private router: Router,
    private alertMessage: AlertMessagesService,
    private pagoService: PagoService
  ) { }

  ngOnInit() {
    this.obtenerPagos();
  }

  private obtenerPagos() {
    this.pagoService.obtenerPagos().subscribe(
      (datos => {
        this.pagos = datos;
        console.log(datos)
      })
    );
  }

  limpiarDatosPago(){
    this.pago = new Pago();
  }

  nuevaPago(){
    this.pago.monto = this.pago.reserva.cantidad * this.pago.reserva.tour.precio;
    this.pago.estado = 'Pendiente'

  }

  accionPago(){
    console.log(this.pago);
    if(this.pago.idPago === 0){
      this.agregarPago(this.pago);
    } else {
      this.editarPago(this.pago);
    }
    
  }

  eliminarPago(pago: Pago, event: Event){
    event.preventDefault();
    event.stopPropagation();

    console.log('eliminar')
    console.log(pago)

    this.pagoService.eliminarPago(pago.idPago).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerPagos();
            this.alertMessage.show('Reserva Eliminada', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('Reserva eliminado')
            this.pagoForm.resetForm();
            setTimeout(() => {
              this.botonCerrarPago.nativeElement.click();
              this.limpiarDatosPago()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }


  editarPago(pago: Pago){
    console.log('editar')
    console.log(pago)

    this.pagoService.editarPago(pago.idPago, pago).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerPagos();
            this.alertMessage.show('Pago Editado', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('reserva editada')
            this.pagoForm.resetForm();
            setTimeout(() => {
              this.botonCerrarPago.nativeElement.click();
              this.limpiarDatosPago()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  agregarPago(pago: Pago){
    console.log('agregar')
    console.log(pago)

    this.pagoService.agregarPago(pago).subscribe(
      {
        next: (datos) => {
          this.router.navigate(['/administracion']).then(() => {
            this.obtenerPagos();
            this.alertMessage.show('Pago Agregada', { cssClass: 'alert alert-success', timeOut: 2000 })
            console.log('reserva agregada')
            this.pagoForm.resetForm();
            setTimeout(() => {
              this.botonCerrarPago.nativeElement.click();
              this.limpiarDatosPago()
            }, 2000);
          });
        },
        error: (errores) => console.log(errores)
      }
    );

  }

  prepararPago(pago: Pago){
    this.pago = pago;
    console.log(pago)
  }


}
