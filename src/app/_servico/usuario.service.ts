import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../_modelo/usuario';

@Injectable()
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  getUsuarios() {
    return this.http.get<Usuario[]>('/api/usuarios');
  }

  getUsuarioById(id: number) {
    return this.http.get<Usuario>('/api/usuarios/' + id);
  }

  getUsuariosFiltrados(filter: string) {
    return this.http.get<Usuario[]>('/api/usuarios/filtrados/' + filter);
  }

  addUsuario(usuario: Usuario) {
    return this.http.post('/api/usuarios', usuario);
  }

  updateUsuario(usuario: Usuario) {
    return this.http.put('/api/usuarios/' + usuario.id, usuario);
  }

  deleteUsuario(id: number) {
    return this.http.delete('/api/usuarios/' + id);
  }

}
