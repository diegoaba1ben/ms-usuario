import {Entity, model, property} from '@loopback/repository';

@model()
export class RolUsuario extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  usuarioId?: number;

  @property({
    type: 'number',
  })
  rolId?: number;

  constructor(data?: Partial<RolUsuario>) {
    super(data);
  }

  isValid(): {isValid: boolean, error?: string} {
    if (this.usuarioId == null) {
      return {isValid: false, error: 'El usuarioId es obligatorio.'};
    }
    if (this.rolId == null) {
      return {isValid: false, error: 'El rolId es obligatorio.'};
    }
    return {isValid: true};
  }
}

export interface RolUsuarioRelations {
  // describe navigational properties here
}

export type RolUsuarioWithRelations = RolUsuario & RolUsuarioRelations;

