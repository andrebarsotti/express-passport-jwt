import lowdb, { LowdbSync } from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync'
import { Profile } from '../models/profile';
import { Usuario } from '../models/usuario';

interface DB {
  usuarios: Usuario[];
}

export class UsuarioRepository {
  private _db: LowdbSync<DB>;
  
  constructor() {
    const adapter =  new FileSync<DB>('db.json')
    this._db = lowdb(adapter)
  }
  
  listarUsuarios(): Profile[] {
    const usuarios = this._db.get("usuarios").value();
    const resultado = usuarios.map<Profile>((value: Usuario) => {
      return {
        id: value.id,
        userId: value.userId,
        name: value.name,
        email: value.email
      }
    });
    return resultado;
  }

  obterUsuarioPorUserId(userName: string): Usuario {
    return this._db.get("usuarios")
                   .find({ userId: userName })
                   .value();
  }
}