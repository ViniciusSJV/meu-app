import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { UsuarioService } from '../_servico/usuario.service';
import { AlertaService } from '../_servico/alerta.service';

import { Usuario } from '../_modelo/usuario';

@Component({
    moduleId: module.id,
    selector: 'app-cadastro-edit',
    templateUrl: './cadastro-edit.component.html',
    styleUrls: ['./cadastro-edit.component.css']
})
export class CadastroEditComponent implements OnInit, OnDestroy  {
    usuario: Usuario = new Usuario();
    id: number;
    usuarioForm: FormGroup;
    private sub: any;
    titulo: string;

    constructor( private router: Router,
              private activatedRoute: ActivatedRoute,
              private usuarioService: UsuarioService,
              private alertaService: AlertaService,
              private formBuilder: FormBuilder ) { }

    ngOnInit(): void {

      this.sub = this.activatedRoute.params.subscribe(params => {
        this.id = +params['id'];
      });

      if ( this.id !== 0 ) {
        this.titulo = 'Editar usuario.';
        this.getUsuarioById();
      } else {
        this.titulo = 'Cadastrar novo usuario';
      }

      this.usuarioForm = new FormGroup({
        'admin': new FormControl(this.usuario.admin),
        'nome': new FormControl(this.usuario.nome, Validators.required),
        'usuario': new FormControl(this.usuario.usuario, Validators.required),
        'senha': new FormControl(this.usuario.senha, Validators.required),
        'email': new FormControl(this.usuario.email, Validators.compose([
          Validators.required,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])
        ),
        'celular': new FormControl(this.usuario.celular, Validators.compose([
          Validators.required,
          Validators.pattern(/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/)])
        )
      });
    }

    ngOnDestroy() {
      this.sub.unsubscribe();
    }

    cadastrarUsuario() {
      if ( this.id !== 0 ) {
        this.updateUsuario();
      } else {
        this.addUsuario();
      }
    }

    getUsuarioById() {
      this.usuarioService.getUsuarioById(this.id).subscribe(usuario => { this.usuario = usuario; });
    }

    addUsuario() {
      this.usuarioService.addUsuario(this.usuario)
            .subscribe(
                data => {
                    this.alertaService.success('Usuario cadastrado', true);
                    this.router.navigate(['home']);
                },
                error => {
                    this.alertaService.error(error);
                });
    }

    updateUsuario() {
      this.usuarioService.updateUsuario(this.usuario)
            .subscribe(
                data => {
                    this.alertaService.success('Usuario atualizado', true);
                    this.router.navigate(['home']);
                },
                error => {
                    this.alertaService.error(error);
                });
    }
}
