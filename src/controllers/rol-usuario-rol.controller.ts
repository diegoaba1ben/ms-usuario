import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Rol,
  RolUsuario,
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
  //Validación del RolUsuario
  async getRol(
    @param.path.number('id') id: typeof RolUsuario.prototype.id,
  ): Promise<Rol> {
    //Validación del RolUsuario
    const existingRolUsuario = await this.rolUsuarioRepository.findById(id);
    //Obtener el Rol asociado al RolUsuario
    return this.rolUsuarioRepository.rol(id);
  }
}
