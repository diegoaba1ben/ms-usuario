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
  RolPermiso,
} from '../models';
import {RolRepository} from '../repositories';

export class RolRolPermisoController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/rol-permisos', {
    responses: {
      '200': {
        description: 'Array of Rol has many RolPermiso',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RolPermiso)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RolPermiso>,
  ): Promise<RolPermiso[]> {
    return this.rolRepository.rolPermisos(id).find(filter);
  }

  @post('/rols/{id}/rol-permisos', {
    responses: {
      '200': {
        description: 'Rol model instance',
        content: {'application/json': {schema: getModelSchemaRef(RolPermiso)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolPermiso, {
            title: 'NewRolPermisoInRol',
            exclude: ['id'],
            optional: ['rolId']
          }),
        },
      },
    }) rolPermiso: Omit<RolPermiso, 'id'>,
  ): Promise<RolPermiso> {
    return this.rolRepository.rolPermisos(id).create(rolPermiso);
  }

  @patch('/rols/{id}/rol-permisos', {
    responses: {
      '200': {
        description: 'Rol.RolPermiso PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolPermiso, {partial: true}),
        },
      },
    })
    rolPermiso: Partial<RolPermiso>,
    @param.query.object('where', getWhereSchemaFor(RolPermiso)) where?: Where<RolPermiso>,
  ): Promise<Count> {
    return this.rolRepository.rolPermisos(id).patch(rolPermiso, where);
  }

  @del('/rols/{id}/rol-permisos', {
    responses: {
      '200': {
        description: 'Rol.RolPermiso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RolPermiso)) where?: Where<RolPermiso>,
  ): Promise<Count> {
    return this.rolRepository.rolPermisos(id).delete(where);
  }
}
