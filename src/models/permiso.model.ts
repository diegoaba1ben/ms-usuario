import {Entity, model, property, hasMany} from '@loopback/repository';
import {RolPermiso} from './rol-permiso.model';

@model()
export class Permiso extends Entity {
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
  nombrePermiso: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  identificador: number;

  @property({
    type: 'date',
    required: true,
  })
  FechaCreacion: string;

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  @hasMany(() => RolPermiso)
  rolPermisos: RolPermiso[];

  constructor(data?: Partial<Permiso>) {
    super(data);
  }
}

export interface PermisoRelations {
  // describe navigational properties here
}

export type PermisoWithRelations = Permiso & PermisoRelations;
