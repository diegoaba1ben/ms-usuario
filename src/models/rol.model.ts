import {Entity, model, property, hasMany} from '@loopback/repository';
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
  })
  nombreRol: string;

  @property({
    type: 'string',
    required: true,
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
