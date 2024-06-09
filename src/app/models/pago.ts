import { MetodoPago } from "./metodo-pago";
import { Reserva } from "./reserva";

export class Pago {

    idPago: number;
    reserva: Reserva;
    metodoPago: MetodoPago;
    monto: number;
    fechaPago: Date;
    estado: string;
    

}
