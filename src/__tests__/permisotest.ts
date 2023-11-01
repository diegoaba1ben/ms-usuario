import {Permiso} from '@/models';
import {DataObject} from '@loopback/repository';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import {isValidColombianDateFormat} from '../utils/utils'; // Importa la función de validación

describe('permiso', () => {
  it('Debería ser válido si la fecha cumple con el formato dd-mm-yyyy', () => {
    const permisoData: DataObject<Permiso> = {
      nombrePermiso: 'Creación de publicaciones',
      descripcion: 'Descripción válida',
      FechaCreacion: '31-10-2023', // Fecha válida en formato dd-mm-yyyy
    };

    //verificación si FechaCreacion tiene un valor y si cumple con el formato
    if (permisoData.FechaCreacion && isValidColombianDateFormat(permisoData.FechaCreacion)) {
      //Si es válida
      console.log('Fecha válida:', permisoData.FechaCreacion);
      expect(true).to.be.true;
    } else {
      //Si no es válida
      console.log('Fecha no válida:', permisoData.FechaCreacion);
      expect(false).to.be.true;
    }

    //Debería ser válido si el nombre y la descripción cumplen con las validaciones y no están vacíos
    describe('permiso', () => {
      it('Debería ser valido si cumple', () => {
        //Defino una variable
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;

        const permisoData: Partial<Permiso> = {
          nombrePermiso: 'Creación contenido', //Debe cumplir con las validaciones del modelo
          descripcion: 'Descripción válida', //Debe cumplir con las validaciones del modelo
          FechaCreacion: '31-2-2023', //Fecha válida en formato dd-mm-yyyy
        };
        //Verificación si nombre del permiso y descripción tienen valor y cumples con las validaciones
        if (
          permisoData.nombrePermiso &&
          permisoData.descripcion &&
          permisoData.FechaCreacion &&
          isValidColombianDateFormat(permisoData.FechaCreacion)
        ) {
          //Verificación de la validez de los campos
          console.log('Nombre Válido:', permisoData.nombrePermiso);
          console.log('Descripción válida', permisoData.descripcion);
          console.log('Fecha válida:', permisoData.FechaCreacion);

          const permiso = new Permiso(permisoData);//el error
          console.log('Permiso:', permiso);

          const isValid = permiso.isValid();
          console.log('isValid:', isValid);
          expect(isValid).to.be.true;
        } else {
          console.log('Alguno de los campos no es válido.');
          expect(false).to.be.true;
        }
      })
    })

  });
});


