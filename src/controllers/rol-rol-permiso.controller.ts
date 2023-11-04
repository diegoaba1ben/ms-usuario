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
  HttpErrors,
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
    // Validación del rolId
    const rol = await this.rolRepository.findById(id);
    if (!rol) {
      throw new HttpErrors.NotFound('Rol no encontrado');
    }

    // Validación del RolRolPermiso
    const rolRolPermisos = await this.rolRepository.rolPermisos(id).find();
    if (!rolRolPermisos.length) {
      throw new HttpErrors.NotFound('RolRolPermiso no encontrado');
    }

    // Crear el RolRolPermiso
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
    //Validación de RolRolPermiso
    const rolrolPermisos = await this.rolRepository.rolPermisos(id).find();
    if (!rolrolPermisos.length) {
      throw new HttpErrors.NotFound('RolRolPermiso no se encuentra')
    }
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
