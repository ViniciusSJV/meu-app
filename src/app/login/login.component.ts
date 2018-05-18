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

          const usuarios: Usuario[] = [
            {id: 1, nome: 'admin', usuario: 'admin', email: 'mail1@mail', senha: '123', celular: '997653456', admin: true},
            {id: 2, nome: 'vinicius', usuario: 'vinicius', email: 'mail2@mail', senha: '123', celular: '998762345', admin: false},
            {id: 3, nome: 'mariana', usuario: '3', email: 'mail3@mail', senha: '123', celular: '99807653', admin: false},
            {id: 4, nome: 'marcos', usuario: '4', email: 'mail4@mail', senha: '123', celular: '998087656', admin: false},
            {id: 5, nome: 'joao', usuario: '5', email: 'mail@mail', senha: '123', celular: '998527939', admin: false},
            {id: 6, nome: 'paulo', usuario: '6', email: 'mail@mail', senha: '123', celular: '998527939', admin: false},
            {id: 7, nome: 'souza', usuario: '7', email: 'mail@mail', senha: '123', celular: '998527939', admin: false},
            {id: 8, nome: 'joao', usuario: '8', email: 'mail@mail', senha: '123', celular: '998527939', admin: false},
            {id: 9, nome: 'vinicius', usuario: '9', email: 'mail@mail', senha: '123', celular: '998527939', admin: false},
            {id: 10, nome: 'souza', usuario: '10', email: 'mail@mail', senha: '123', celular: '998527939', admin: false}
          ];

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
