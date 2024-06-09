import { Tour } from "./tour";
import { Usuario } from "./usuario";

export class Reserva {


    idReserva: number;
    usuario: Usuario;
    tour: Tour;
    fechaReserva: Date;
    estado: string;
    cantidad: number;

    constructor() {
        this.idReserva = 0;
        this.usuario = new Usuario();
        this.tour = new Tour();
        this.estado = '';
    }
}
