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
    required: true,
  })
  rolId: number;

  @property({
    type: 'number',
    required: true,
  })
  permisoId: number;

  constructor(data?: Partial<RolPermiso>) {
    super(data);
  }

  isValid(): boolean {
    // Validación de las relaciones
    return this.rolId != null && this.permisoId != null;
  }
}

export interface RolPermisoRelations {
  // Define relaciones adicionales si es necesario
}

export type RolPermisoWithRelations = RolPermiso & RolPermisoRelations;
