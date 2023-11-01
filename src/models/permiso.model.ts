import {Entity, model, property} from '@loopback/repository';

function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  // Si la instancia de Date es válida y la cadena de entrada es igual a la representación de cadena de la fecha,
  // entonces la cadena de fecha es válida
  return date instanceof Date && dateString === date.toISOString();
}

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
    jsonSchema: {
      minLength: 3, // Longitud mínima
      maxLength: 15, // Longitud máxima.
      pattern: '^[A-Za-z]+$', // Solo letras
      errorMessage: {
        pattern: 'El nombre debe contener únicamente letras.',
      },
    },
  })
  nombrePermiso: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3, // Longitud mínima
      maxLength: 50, // Longitud máxima
      pattern: '^[A-Za-z]+$', // Solo letras
      errorMessage: {
        pattern: 'La descripción debe tener entre 3 y 50 caracteres.',
      },
    },
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  FechaCreacion: string; // Tener cuidado que en la base de datos también sea de tipo date.

  @property({
    type: 'boolean',
    required: true,
  })
  estado: boolean;

  constructor(data?: Partial<Permiso>) {
    super(data);
    if (data != null && typeof data.FechaCreacion === 'undefined') {
      this.FechaCreacion = new Date().toString();
    }
  }

  isValid(): boolean {
    if (
      !this.nombrePermiso || this.nombrePermiso.length < 3 || this.descripcion.length > 50 ||
      !isValidDateString(this.FechaCreacion)
    ) {
      return false;
    }
    return true;
  }
}

export interface PermisoRelations {
  // describe navigational properties here
}

export type PermisoWithRelations = Permiso & PermisoRelations;

