import { Tour } from "./tour";
import { Usuario } from "./usuario";

export class Comentario {

    idComentario: number;
    usuario: Usuario;
    tour: Tour;
    titulo: string;
    comentario: string;
    calificacion: number;
    fechaComentario: Date;

}
