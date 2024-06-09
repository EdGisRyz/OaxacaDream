export class Tour {
    idTour: number;
    nombre: string;
    descripcion: string;
    duracion: string;
    precio: number;
    capacidadMax: number;
    fechaCreacion: Date;
    localizacion: string;

    constructor(){
        this.idTour = 0;
        this.nombre = '';
        this.descripcion = '';
    }
}