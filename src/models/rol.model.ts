import {Entity, hasMany, model, property} from '@loopback/repository';
import {RolUsuario} from './rol-usuario.model';

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
      minLength: 3, //Longitud mínima.
      maxLength: 10, // Máximo 10 caracteres
      pattern: '^[A-Za-z]+$', //Solo letras
      errorMessage: {
        pattern: 'El nombre del rol debe contener solamente letras.'
      },
    },
  })
  nombreRol: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3, // Longitud mínima
      maxLength: 50, // Longitud máxima.
      pattern: '[A-Za-z]+$',// Solo letras en el campo
      errorMessage: {
        pattern: 'La descripción de los roles debe contener letras'
      }
    }
  })
  descripcion: string;

  @hasMany(() => RolUsuario)
  rolUsuarios: RolUsuario[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
