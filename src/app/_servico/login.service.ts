import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Usuario } from '../_modelo/usuario';

@Injectable()
export class LoginService {

    constructor(private http: HttpClient) { }

    login(usuario: string, senha: string) {
        return this.http.post<any>('/api/authenticate', { username: usuario, senha: senha })
            .map(body => {
                if (body) {
                    localStorage.setItem('usuarioLogado', JSON.stringify(body));
                }

                return usuario;
            });
    }

    logout() {
        localStorage.removeItem('usuarioLogado');
    }
}
