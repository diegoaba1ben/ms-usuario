import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, RolUsuario} from '../models';
import {RolUsuarioRepository} from './rol-usuario.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly rolUsuarios: HasManyRepositoryFactory<RolUsuario, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolUsuarioRepository') protected rolUsuarioRepositoryGetter: Getter<RolUsuarioRepository>,
  ) {
    super(Usuario, dataSource);
    this.rolUsuarios = this.createHasManyRepositoryFactoryFor('rolUsuarios', rolUsuarioRepositoryGetter,);
    this.registerInclusionResolver('rolUsuarios', this.rolUsuarios.inclusionResolver);
  }
}
