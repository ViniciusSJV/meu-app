import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { Usuario } from '../_modelo/usuario';

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) { }

    login(username: string, senha: string): boolean {
        //return this.http.post<any>('url', { usuario: usuario, senha: senha })
            //.map(usuario => {
                //if (usuario) {
                    //localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                //}
                //return usuario;
            //});
            let usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios')) || [];

            let usuarioLogin = usuarios.filter(usuario => {
               return usuario.usuario === username && usuario.senha === senha;
            });

            if (usuarioLogin.length) {
              let usuario = usuarioLogin[0];

              localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

              return true;
            } else {

                return false;
            }
    }

    logout() {
        localStorage.removeItem('usuarioLogado');
    }
}
