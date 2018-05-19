import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { Usuario } from '../_modelo/usuario';

@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios')) || [];

        if ( usuarios.length === 0 ) {
          usuarios = [
              {id: 1, nome: 'admin', usuario: 'admin', email: 'mail1@mail', senha: '123', celular: '997653456', admin: true},
              {id: 2, nome: 'vinicius', usuario: 'vinicius', email: 'mail2@mail', senha: '123', celular: '998762345', admin: false}
            ];

          localStorage.setItem('usuarios', JSON.stringify(usuarios));
         }

        return Observable.of(null).mergeMap(() => {

            if (request.url.endsWith('/api/authenticate') && request.method === 'POST') {

                const usuariosFiltrado = usuarios.filter(usuario => {
                    return usuario.usuario === request.body.username && usuario.senha === request.body.senha;
                });

                if (usuariosFiltrado.length) {

                    const usuario = usuariosFiltrado[0];

                    return Observable.of(new HttpResponse({ status: 200, body: usuario }));
                } else {
                    return Observable.throw('Usuario ou senha incorreta.');
                }
            }

            if (request.url.endsWith('/api/usuarios') && request.method === 'GET') {
                return Observable.of(new HttpResponse({ status: 200, body: usuarios }));
            }

            if (request.url.match(/\/api\/usuarios\/\d+$/) && request.method === 'GET') {

              const urlSplit = request.url.split('/');
              const id = parseInt(urlSplit[urlSplit.length - 1], 10);
              const usuarosFiltrados = usuarios.filter(usuarioCadastrado => {
                return usuarioCadastrado.id === id;
              });
              const usuario = usuarosFiltrados[0];

              return Observable.of(new HttpResponse({ status: 200, body: usuario }));
            }

            if (request.url.match(/\/api\/usuarios\/filtrados\/\w+$/) && request.method === 'GET') {

              const urlSplit = request.url.split('/');
              const filtro = urlSplit[urlSplit.length - 1].toString();
              const usuarosFiltrados = usuarios.filter(usuario => {
                   return usuario.usuario.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 ||
                   usuario.nome.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 ||
                   usuario.email.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 ||
                   usuario.celular.toUpperCase().indexOf(filtro.toUpperCase()) >= 0;
              });

              return Observable.of(new HttpResponse({ status: 200, body: usuarosFiltrados }));
            }

            if (request.url.endsWith('/api/usuarios') && request.method === 'POST') {

                const novoUsuario = request.body;

                const usuarioDuplicado = usuarios.filter(usuario => {
                  return usuario.usuario === novoUsuario.usuario;
                }).length;

                if (usuarioDuplicado) {
                    return Observable.throw('Usuario "' + novoUsuario.usuario + '" ja existe.');
                }

                novoUsuario.id = usuarios.length + 1;
                usuarios.push(novoUsuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));

                return Observable.of(new HttpResponse({ status: 200 }));
            }

            if (request.url.match(/\/api\/usuarios\/\d+$/) && request.method === 'PUT') {

              const usuarioAtualizado = request.body;

              const urlSplit = request.url.split('/');
              const id = parseInt(urlSplit[urlSplit.length - 1], 10);

              for (let count = 0; count < usuarios.length; count++) {
                  const usuario = usuarios[count];
                  if (usuario.id === id) {
                      usuarios.splice(count, 1);
                      break;
                  }
              }

              usuarios.push(usuarioAtualizado);
              localStorage.setItem('usuarios', JSON.stringify(usuarios));

              return Observable.of(new HttpResponse({ status: 200 }));
            }

            if (request.url.match(/\/api\/usuarios\/\d+$/) && request.method === 'DELETE') {

              const urlSplit = request.url.split('/');
              const id = parseInt(urlSplit[urlSplit.length - 1], 10);
              for (let count = 0; count < usuarios.length; count++) {
                  const usuario = usuarios[count];
                  if (usuario.id === id) {
                      usuarios.splice(count, 1);
                      localStorage.setItem('usuarios', JSON.stringify(usuarios));
                      break;
                  }
              }

              return Observable.of(new HttpResponse({ status: 200 }));
            }

            return next.handle(request);

        })

        .materialize()
        .dematerialize();
    }
}

export let BackendProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: BackendInterceptor,
    multi: true
};
