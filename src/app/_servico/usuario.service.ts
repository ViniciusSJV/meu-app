import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Usuario } from '../_modelo/usuario';

@Injectable()
export class UsuarioService {

  constructor(private http:Http) { }

    getUsuarios(): Observable<Usuario[]> {

      let usuarios: any[] = JSON.parse(localStorage.getItem('usuarios')) || [];

      return Observable.of(usuarios);
        //return this.http.get("")
	        //.map(this.getData)
	        //.catch(this.handleErrorObservable);
    }

    addUsuario(usuario:Usuario) {
      let usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios')) || [];

      usuario.id = usuarios.length + 1;
      usuarios.push(usuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      return Observable.of(new HttpResponse({ status: 200 }));

      //let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
      //let options = new RequestOptions({ headers: cpHeaders });

      //return this.http.post("", usuario, options)
         //.map(success => success.status)
         //.catch(this.handleErrorObservable);
}

  private getData(res: Response) {
	     let body = res.json();
       return body;
  }

  private handleErrorObservable (error: Response | any) {
	    return Observable.throw(error.message || error);
  }

}
