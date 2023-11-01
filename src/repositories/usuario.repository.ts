import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, RolUsuario, Rol} from '../models';
import {RolUsuarioRepository} from './rol-usuario.repository';
import {RolRepository} from './rol.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly rolUsuarios: HasManyRepositoryFactory<RolUsuario, typeof Usuario.prototype.id>;

  public readonly rols: HasManyThroughRepositoryFactory<Rol, typeof Rol.prototype.id,
          RolUsuario,
          typeof Usuario.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolUsuarioRepository') protected rolUsuarioRepositoryGetter: Getter<RolUsuarioRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Usuario, dataSource);
    this.rols = this.createHasManyThroughRepositoryFactoryFor('rols', rolRepositoryGetter, rolUsuarioRepositoryGetter,);
    this.registerInclusionResolver('rols', this.rols.inclusionResolver);
    this.rolUsuarios = this.createHasManyRepositoryFactoryFor('rolUsuarios', rolUsuarioRepositoryGetter,);
    this.registerInclusionResolver('rolUsuarios', this.rolUsuarios.inclusionResolver);
  }
}
