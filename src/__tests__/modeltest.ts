import {expect} from 'chai';
import {describe, it} from 'mocha';
import {Usuario} from '../models'; // Import del modelo a testear.

describe('Usuario', () => {
  it('debería ser válido si se proporcionan propiedades válidas', () => {
    const userData = {
      nombre: 'Diego',
      apellido: 'Benjumea',
      email: 'alfastream.co@gmail.com',
      password: 'PassW123/' // Contraseña con todas las características requeridas
    };

    const usuario = new Usuario(userData); // Crear una instancia de Usuario usando userData

    //Verificación que el usuario sea válido
    const isValid = usuario.isValid();
    expect(isValid).to.be.true;

    //Verificación de las propiedades del usuario
    expect(usuario.nombre).to.equal(userData.nombre);
    expect(usuario.apellido).to.equal(userData.apellido);
    expect(usuario.email).to.equal(userData.email);
  });
  it('Debería ser inválido si faltan propiedades requeridas', () => {
    const usuario = new Usuario({
      nombre: '', //Validación datos faltantes
      apellido: 'Benjumea',
      email: 'alfastream.co@gmail.com',
      password: '' //Validación datos faltantes
    });
    // Verificación que el usuario sea inválido
    const isValid = usuario.isValid();
    expect(isValid).to.be.false;
  })
});

