import {Entity, model, property, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
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

  @hasMany(() => Rol, {through: {model: () => RolUsuario}})
  rols: Rol[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
  isValid(): boolean {
    //validación de letras
    const letrasRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+$/u;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (!this.nombre || !this.apellido ||
      !letrasRegex.test(this.nombre) || !letrasRegex.test(this.apellido)) {
      return false// devuelve falso si los espacios está en blanco
    }
    if (
      !this.email ||
      !this.password ||
      !emailRegex.test(this.email) ||
      this.password.length < 8 || // Mínimo 8 caracteres
      this.password.length > 12 || // Máximo 12 caracteres
      !lowercaseRegex.test(this.password) || // Al menos una letra minúscula
      !uppercaseRegex.test(this.password) || // Al menos una letra mayúscula
      !numberRegex.test(this.password) ||// Al menos un número
      !specialCharRegex.test(this.password)) {
      return false // devuelve falso si los espacios están en blanco
    }
    return true
  }

}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
