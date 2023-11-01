import {DataObject} from '@loopback/repository';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Rol} from '../models'; // Importa el modelo Rol a testear.

describe('Rol', () => {
  it('debería ser válido si se proporcionan propiedades válidas', () => {
    const rolData: DataObject<Rol> = {
      nombreRol: 'Admin',
      descripcion: 'Descripción válida',
    };


    const rol = new Rol(rolData); // Crea una instancia de Rol usando rolData

    // Verificación que el rol sea válido
    const isValid = rol.isValid();
    expect(isValid).to.be.true;

    // Verificación de las propiedades del rol
    expect(rol.nombreRol).to.equal(rolData.nombreRol);
    expect(rol.descripcion).to.equal(rolData.descripcion);
  });

  it('Debería ser no válido si falta el nombre del rol', () => {
    const rol = new Rol({
      // Nombre faltante

    });

    // Verificación que el rol sea inválido
    const isValid = rol.isValid();
    expect(isValid).to.be.false;
  });
});

