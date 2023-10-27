import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RolPermiso, RolPermisoRelations, Permiso} from '../models';
import {PermisoRepository} from './permiso.repository';

export class RolPermisoRepository extends DefaultCrudRepository<
  RolPermiso,
  typeof RolPermiso.prototype.id,
  RolPermisoRelations
> {

  public readonly permiso: BelongsToAccessor<Permiso, typeof RolPermiso.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PermisoRepository') protected permisoRepositoryGetter: Getter<PermisoRepository>,
  ) {
    super(RolPermiso, dataSource);
    this.permiso = this.createBelongsToAccessorFor('permiso', permisoRepositoryGetter,);
    this.registerInclusionResolver('permiso', this.permiso.inclusionResolver);
  }
}
