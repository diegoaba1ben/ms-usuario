import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RolUsuario, RolUsuarioRelations, Usuario, Rol} from '../models';
import {UsuarioRepository} from './usuario.repository';
import {RolRepository} from './rol.repository';

export class RolUsuarioRepository extends DefaultCrudRepository<
  RolUsuario,
  typeof RolUsuario.prototype.id,
  RolUsuarioRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof RolUsuario.prototype.id>;

  public readonly rol: BelongsToAccessor<Rol, typeof RolUsuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(RolUsuario, dataSource);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
