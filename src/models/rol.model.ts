import {Entity, hasMany, model, property} from '@loopback/repository';
import {Permiso} from './permiso.model';
import {RolPermiso} from './rol-permiso.model';

@model()
export class Rol extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3,
      maxLength: 20,
      pattern: '^[A-Za-z]+$',
      errorMessage: {
        pattern: 'El nombre del rol debe contener solamente letras.',
      },
    },
  })
  nombreRol: string;


  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3,
      maxLength: 50,
      pattern: '^[A-Za-z]+$',
      errorMessage: {
        pattern: 'La descripción de los roles debe contener 50 caracteres.',
      },
    },
  })
  descripcion: string;



  @hasMany(() => Permiso, {through: {model: () => RolPermiso}})
  permisos: Permiso[]; // adquiere los datos para crear una lista de los permisos

  isValid(): boolean {
    // Validaciones para el nombre y la descripción
    const letrasRegex = /^[A-Za-z]+$/;
    const nombreRolValido = this.nombreRol && letrasRegex.test(this.nombreRol) &&
      this.nombreRol.length >= 3;
    const descripcionValida = this.descripcion && this.descripcion.length >= 3 &&
      this.descripcion.length <= 50;
    return true;
  }
  //Método para traer un listado de permisos
  getPermisos(): Permiso[] {
    if (!this.permisos) {
      this.permisos = [];
    }
    return this.permisos
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;

