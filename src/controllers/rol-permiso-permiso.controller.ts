import {
  repository,
} from '@loopback/repository';
import {
  HttpErrors,
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Permiso,
  RolPermiso,
} from '../models';
import {RolPermisoRepository} from '../repositories';

export class RolPermisoPermisoController {
  constructor(
    @repository(RolPermisoRepository)
    public rolPermisoRepository: RolPermisoRepository,
  ) { }

  @get('/rol-permisos/{id}/permiso', {
    responses: {
      '200': {
        description: 'Permiso belonging to RolPermiso',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Permiso),
          },
        },
      },
    },
  })
  async getPermiso(
    @param.path.number('id') id: typeof RolPermiso.prototype.id,
  ): Promise<Permiso> {
    try {
      // Validación del ID: Verifica si el ID es numérico y no nulo
      if (id == undefined || id === null) {
        throw new HttpErrors.BadRequest('id no proporcionado');
      }

      // Código para recuperar el Permiso
      const permiso: Permiso | null = await this.rolPermisoRepository.permiso(id);

      // Si el permiso no existe, arroja un error NotFound
      if (!permiso) {
        throw new HttpErrors.NotFound('Permiso no encontrado');
      }

      return permiso;
    } catch (error) {
      // Manejo de errores: arroja errores HTTP adecuados según la situación
      if (error instanceof HttpErrors.HttpError) {
        throw error; // Si es un error HTTP, se regresa tal cual.
      }
      console.error(error); // Loggea otros tipos de errores para diagnóstico.
      throw new HttpErrors.InternalServerError('Error interno del servidor');
    }
  }
}
