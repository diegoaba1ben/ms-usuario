import {
  RolPermisoPermisoController,
  RolRolPermisoController,
  RolRolUsuarioController,
  RolUsuarioRolController
} from '@/controllers';
import {Application} from '@loopback/rest/dist';

import express from 'express';
import * as path from 'path';

export function setupRoutes(app: Application) {
  //Bind controllers
  app.controller(RolUsuarioRolController);
  app.controller(RolRolUsuarioController);
  app.controller(RolRolPermisoController);
  app.controller(RolPermisoPermisoController);


  //Diego Benjumea
  //Configuración de archivos estáticos
  const expressApp = express();
  const restExplorerPath = 'explorer';
  const publicPath = path.resolve(__dirname, './public');
  expressApp.use('/public', express.static(publicPath));

  //Monta las rutas de Express en Loopback
  app.mountExpressRouter('/express', expressApp);//Esta ruta la maneja express

  //configuración de Rest Explorer
  app.static(restExplorerPath, publicPath);

  //Iniciao de la aplicación
  app.start().the(() => {
    console.log('Aplicación iniciada en ${app.restServer.url');
  }).catch((err: any) => {
    console.error('Error al iniciar la aplicacion', err);
  });

  //Configurar la secuencia

  //Configure modelos y data source (si no se ha hecho en otro lado)

  //Configure la autenticación y autorización (si es necesario)

  //Configure CORS, si se requiere

  //Configure cualquier otro middleware o configuración.



}
