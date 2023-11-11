import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {
  RestApplication
} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import express from 'express'; // Importa Express
import path from 'path';
import {MySequence} from './my-sequence';


export {ApplicationConfig};

export class App extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  //Crear una instancia para express
  //Diego Benjumea
  private readonly expressApp: express.Application;

  constructor(options: ApplicationConfig = {}) {
    super(options);

    //Configuración Express para el manejo de archivos estáticos con express
    const publicPath = path.resolve(__dirname, '../public');
    this.expressApp.use('/public', express.static(publicPath));

    /* Configuración y personalización de la secuencia. con un diseño
    un poco más modular y que permite mejor escalabilidad en el futuro*/
    this.sequence(MySequence);

    //Monta las rutas de Express en Loopback
    this.mountExpressRoutes();

    // Configura las opciones de inicio
    this.bootOptions = {
      controllers: {
        // Personalización de las convenciones del ControllerBooter
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }

  //Monta las rutas de Express en Loopback
  private mountExpressRoutes() {
    //Ruta manejada por Express
    this.expressApp.get('/express', (req, res) => {
      res.send('Hola desde Express!');
    });
  }
}
