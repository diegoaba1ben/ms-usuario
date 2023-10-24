import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, RolUsuario} from '../models';
import {RolUsuarioRepository} from './rol-usuario.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly rolUsuarios: HasManyRepositoryFactory<RolUsuario, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolUsuarioRepository') protected rolUsuarioRepositoryGetter: Getter<RolUsuarioRepository>,
  ) {
    super(Rol, dataSource);
    this.rolUsuarios = this.createHasManyRepositoryFactoryFor('rolUsuarios', rolUsuarioRepositoryGetter,);
    this.registerInclusionResolver('rolUsuarios', this.rolUsuarios.inclusionResolver);
  }
}
