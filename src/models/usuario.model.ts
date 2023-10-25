import {Entity, hasMany, model, property} from '@loopback/repository';
import {RolUsuario} from './rol-usuario.model';

@model()
export class Usuario extends Entity {
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
      pattern: '^[A-Za-zzÀ-ÿ]+$', //Solo letras, incluso de otros idiomas
      errorMessage: {
        pattern: 'El nombre debe contener únicamente letras.'
      }

    }
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3, //Longitud mínima
      pattern: '^[A-Za-zÀ-ÿ]+$', //Solo letras, incluso de otros idiomas.
      errorMessage: {
        pattern: 'El apellido debe contener solo letras.'
      }
    }
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email', //Define el formato de correo electrónico
    }
  })
  email: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8, // Mínimo 8 caracteres
      maxLength: 12, // Máximo 12 caracteres
      pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/', // Expresión regular para las reglas de validación
      errorMessage: {
        pattern: 'La contraseña debe tener entre 8 y 12 caracteres, incluyendo al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.',
      },
    },
  })
  password: string;

  @hasMany(() => RolUsuario)
  rolUsuarios: RolUsuario[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
