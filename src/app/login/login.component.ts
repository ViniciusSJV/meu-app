import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LoginService } from '../_servico/login.service';
import { AlertaService } from '../_servico/alerta.service';

import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { Usuario } from '../_modelo/usuario';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html',
    selector: 'app-login',
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
        private alertaService: AlertaService,
        private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginService.logout();

        this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || 'home';

        this.form = new FormGroup({
          'usuario': new FormControl(this.usuario.usuario, Validators.required),
          'senha': new FormControl(this.usuario.senha, Validators.required)
        });
    }

    login() {
      this.loginService.login(this.usuario.usuario, this.usuario.senha)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertaService.error(error);
                });
    }
}
