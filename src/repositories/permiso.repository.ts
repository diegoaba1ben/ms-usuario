import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, EntityNotFoundError, HasManyRepositoryFactory, repository} from '@loopback/repository';
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
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
    @repository.getter('RolPermisoRepository') protected rolPermisoRepositoryGetter: Getter<RolPermisoRepository>,
  ) {
    super(Permiso, dataSource);
    this.rolPermisos = this.createHasManyRepositoryFactoryFor('rolPermisos', rolPermisoRepositoryGetter,);
    this.registerInclusionResolver('rolPermisos', this.rolPermisos.inclusionResolver);
  }
  //para incluir el findOne para buscar permisos
  async permiso(id: number): Promise<Permiso | null> {
    try {
      return await this.findById(id);
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        return null;
      }
      throw error;
    }
  }
}
