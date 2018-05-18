import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../_servico/login.service';

import { FormGroup, FormControl, Validators, FormBuilder }   from '@angular/forms';

import { Usuario } from '../_modelo/usuario';

@Component({
    templateUrl: 'login.component.html',
    selector: 'login',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    usuario: Usuario = new Usuario();
    returnUrl: string;
    form;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private loginService: LoginService,
        private formBuilder: FormBuilder) {

          let usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios')) || [];

          if(usuarios.length === 0){
            usuarios = [
                {id: 1, nome: 'admin', usuario: 'admin', email: 'mail1@mail', senha: '123', celular: '997653456', admin: true},
                {id: 2, nome: 'vinicius', usuario: 'vinicius', email: 'mail2@mail', senha: '123', celular: '998762345', admin: false}
              ];
          }

          localStorage.setItem('usuarios', JSON.stringify(usuarios));

        }

    ngOnInit() {

        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || 'home';

        this.loginService.logout();

        this.form = new FormGroup({
          'usuario': new FormControl(this.usuario.usuario, Validators.required),
          'senha': new FormControl(this.usuario.senha, Validators.required)
        })
    }

    login() {
        if(this.loginService.login(this.usuario.usuario, this.usuario.senha)){
            this.router.navigate([this.returnUrl]);
        }else{
            alert('Usuario ou senha invalidos');
        }
    }
}
