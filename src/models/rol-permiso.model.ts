import {Entity, model, property} from '@loopback/repository';

@model()
export class RolPermiso extends Entity {
  @property({
    type: 'number',
    id: true, // Clave primaria
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    id: true, // Clave foránea, debe tener el mismo modificador 'id'
  })
  rolId: number;

  @property({
    type: 'number',
    id: true, // Clave foránea de la otra relación, también debe tener el modificador 'id'
  })
  permisoId: number;

  constructor(data?: Partial<RolPermiso>) {
    super(data);
  }
}

export interface RolPermisoRelations {
  // Define relaciones adicionales si es necesario
}

export type RolPermisoWithRelations = RolPermiso & RolPermisoRelations;

