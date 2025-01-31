export interface Aprobado {
    id?: number;
    nombre: string;
    apellido: string;
    propuesta: string;
    estado: 'Aprobado' | 'Denegado';
}