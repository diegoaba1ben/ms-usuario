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
  Usuario,
} from '../models';
import {RolUsuarioRepository} from '../repositories';

export class RolUsuarioUsuarioController {
  constructor(
    @repository(RolUsuarioRepository)
    public rolUsuarioRepository: RolUsuarioRepository,
  ) { }

  @get('/rol-usuarios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to RolUsuario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Usuario),
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.number('id') id: typeof RolUsuario.prototype.id,
  ): Promise<Usuario> {
    return this.rolUsuarioRepository.usuario(id);
  }
}
