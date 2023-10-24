import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Rol,
  RolUsuario,
} from '../models';
import {RolRepository} from '../repositories';

export class RolRolUsuarioController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/rol-usuarios', {
    responses: {
      '200': {
        description: 'Array of Rol has many RolUsuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RolUsuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RolUsuario>,
  ): Promise<RolUsuario[]> {
    return this.rolRepository.rolUsuarios(id).find(filter);
  }

  @post('/rols/{id}/rol-usuarios', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(RolUsuario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolUsuario, {
            title: 'NewRolUsuarioInRol',
            exclude: ['id'],
            optional: ['rolId']
          }),
        },
      },
    }) rolUsuario: Omit<RolUsuario, 'id'>,
  ): Promise<RolUsuario> {
    return this.rolRepository.rolUsuarios(id).create(rolUsuario);
  }

  @patch('/rols/{id}/rol-usuarios', {
    responses: {
      '200': {
        description: 'Rol.RolUsuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolUsuario, {partial: true}),
        },
      },
    })
    rolUsuario: Partial<RolUsuario>,
    @param.query.object('where', getWhereSchemaFor(RolUsuario)) where?: Where<RolUsuario>,
  ): Promise<Count> {
    return this.rolRepository.rolUsuarios(id).patch(rolUsuario, where);
  }

  @del('/rols/{id}/rol-usuarios', {
    responses: {
      '200': {
        description: 'Rol.RolUsuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RolUsuario)) where?: Where<RolUsuario>,
  ): Promise<Count> {
    return this.rolRepository.rolUsuarios(id).delete(where);
  }
}
