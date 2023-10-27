import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, RolUsuario, RolPermiso} from '../models';
import {RolUsuarioRepository} from './rol-usuario.repository';
import {RolPermisoRepository} from './rol-permiso.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly rolUsuarios: HasManyRepositoryFactory<RolUsuario, typeof Rol.prototype.id>;

  public readonly rolPermisos: HasManyRepositoryFactory<RolPermiso, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolUsuarioRepository') protected rolUsuarioRepositoryGetter: Getter<RolUsuarioRepository>, @repository.getter('RolPermisoRepository') protected rolPermisoRepositoryGetter: Getter<RolPermisoRepository>,
  ) {
    super(Rol, dataSource);
    this.rolPermisos = this.createHasManyRepositoryFactoryFor('rolPermisos', rolPermisoRepositoryGetter,);
    this.registerInclusionResolver('rolPermisos', this.rolPermisos.inclusionResolver);
    this.rolUsuarios = this.createHasManyRepositoryFactoryFor('rolUsuarios', rolUsuarioRepositoryGetter,);
    this.registerInclusionResolver('rolUsuarios', this.rolUsuarios.inclusionResolver);
  }
}
