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
  RolUsuario,
  Usuario
} from '../models';

import {RolRepository, UsuarioRepository} from '../repositories';

export class UsuarioRolUsuarioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/usuarios/{id}/rol-usuarios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many RolUsuario',
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
    //Validación del usuario
    const existingUsuario = await this.usuarioRepository.findById(id);
    if (!existingUsuario) {
      throw new HttpErrors.NotFound('Usuario no encontrado');
    }
    //Obtiene los RolUsuario asociados al usuario
    return this.usuarioRepository.rolUsuarios(id).find(filter);
  }


  //obtener RolUsuario específico por su id

  @post('/usuarios/{id}/rol-usuarios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(RolUsuario)}},
      },
    },
  })

  async create(
    @param.path.number('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolUsuario, {
            title: 'NewRolUsuarioInUsuario',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) rolUsuario: Omit<RolUsuario, 'id'>,
  ): Promise<RolUsuario> {
    //Validación del usuario
    const existingUsuario = await this.usuarioRepository.findById(id);
    if (!existingUsuario) {
      throw new HttpErrors.NotFound('Usuario no encontrado');
    }

    //Crear el RolUsuario
    return this.usuarioRepository.rolUsuarios(id).create(rolUsuario);
  }

  @patch('/usuarios/{id}/rol-usuarios', {
    responses: {
      '200': {
        description: 'Usuario.RolUsuario PATCH success count',
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
    return this.usuarioRepository.rolUsuarios(id).patch(rolUsuario, where);
  }

  @del('/usuarios/{id}/rol-usuarios', {
    responses: {
      '200': {
        description: 'Usuario.RolUsuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RolUsuario)) where?: Where<RolUsuario>,
  ): Promise<Count> {
    return this.usuarioRepository.rolUsuarios(id).delete(where);
  }
}
