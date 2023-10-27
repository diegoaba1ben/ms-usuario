import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RolPermiso,
  Permiso,
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
    return this.rolPermisoRepository.permiso(id);
  }
}
