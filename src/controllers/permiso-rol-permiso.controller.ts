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
  Permiso,
  RolPermiso,
} from '../models';
import {PermisoRepository} from '../repositories';

export class PermisoRolPermisoController {
  constructor(
    @repository(PermisoRepository) protected permisoRepository: PermisoRepository,
  ) { }

  @get('/permisos/{id}/rol-permisos', {
    responses: {
      '200': {
        description: 'Array of Permiso has many RolPermiso',
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
    return this.permisoRepository.rolPermisos(id).find(filter);
  }

  @post('/permisos/{id}/rol-permisos', {
    responses: {
      '200': {
        description: 'Permiso model instance',
        content: {'application/json': {schema: getModelSchemaRef(RolPermiso)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Permiso.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolPermiso, {
            title: 'NewRolPermisoInPermiso',
            exclude: ['id'],
            optional: ['permisoId']
          }),
        },
      },
    }) rolPermiso: Omit<RolPermiso, 'id'>,
  ): Promise<RolPermiso> {
    //Validaciones antes de crear-Rol Permiso
    if (rolPermiso.permisoId !== id) {
      throw new Error('La Id del permiso en el cuerpo no coincide con la id de la URL')
    }
    //Crear el RolPermiso
    return this.permisoRepository.rolPermisos(id).create(rolPermiso);
  }

  @patch('/permisos/{id}/rol-permisos', {
    responses: {
      '200': {
        description: 'Permiso.RolPermiso PATCH success count',
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
    return this.permisoRepository.rolPermisos(id).patch(rolPermiso, where);
  }

  @del('/permisos/{id}/rol-permisos', {
    responses: {
      '200': {
        description: 'Permiso.RolPermiso DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RolPermiso)) where?: Where<RolPermiso>,
  ): Promise<Count> {
    return this.permisoRepository.rolPermisos(id).delete(where);
  }
}
