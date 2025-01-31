export interface Revision {
    id?: number;
    nombre: string;
    apellido: string;
    tesis: string;
    proceso: 'Ingresado' | 'En Proceso' | 'Cancelado';
    docente: string;
}