export class Persona {
    cedula: string;
    nombre: string;
    apellido: string;
    fechaNacimiento: Date;
    genero:string;
    estado: boolean;

    
    constructor(cedula: string, nombre: string, apellido: string, fechaNacimiento: Date,genero:string, estado: boolean) {
        this.cedula = cedula;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.genero= genero;
        this.estado = estado;

    }
}