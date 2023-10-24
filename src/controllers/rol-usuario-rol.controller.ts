import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RolUsuario,
  Rol,
} from '../models';
import {RolUsuarioRepository} from '../repositories';

export class RolUsuarioRolController {
  constructor(
    @repository(RolUsuarioRepository)
    public rolUsuarioRepository: RolUsuarioRepository,
  ) { }

  @get('/rol-usuarios/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to RolUsuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Rol),
          },
        },
      },
    },
  })
  async getRol(
    @param.path.number('id') id: typeof RolUsuario.prototype.id,
  ): Promise<Rol> {
    return this.rolUsuarioRepository.rol(id);
  }
}
