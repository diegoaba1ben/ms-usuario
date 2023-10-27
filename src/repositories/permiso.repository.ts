import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Permiso, PermisoRelations, RolPermiso} from '../models';
import {RolPermisoRepository} from './rol-permiso.repository';

export class PermisoRepository extends DefaultCrudRepository<
  Permiso,
  typeof Permiso.prototype.id,
  PermisoRelations
> {

  public readonly rolPermisos: HasManyRepositoryFactory<RolPermiso, typeof Permiso.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolPermisoRepository') protected rolPermisoRepositoryGetter: Getter<RolPermisoRepository>,
  ) {
    super(Permiso, dataSource);
    this.rolPermisos = this.createHasManyRepositoryFactoryFor('rolPermisos', rolPermisoRepositoryGetter,);
    this.registerInclusionResolver('rolPermisos', this.rolPermisos.inclusionResolver);
  }
}
