import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }   from '@angular/forms';

import { UsuarioService } from '../_servico/usuario.service';

import { Usuario } from '../_modelo/usuario';

@Component({
    selector: 'cadastro',
    templateUrl: './cadastro.component.html',
	  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

	  usuario: Usuario = new Usuario();
    usuarioLogado: Usuario = new Usuario();
    returnUrl: string;
    form;

	  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
	            private usuarioService: UsuarioService,
              private formBuilder: FormBuilder) {

                this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
     }

    ngOnInit(): void {

      this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || 'home';

      this.form = new FormGroup({
        'admin': new FormControl(this.usuario.admin),
        'nome': new FormControl(this.usuario.nome, Validators.required),
        'usuario': new FormControl(this.usuario.usuario, Validators.required),
        'senha': new FormControl(this.usuario.senha, Validators.required),
        'email': new FormControl(this.usuario.email, Validators.required),
        'celular': new FormControl(this.usuario.celular, Validators.required)
  })

    }

    cadastrarUsuario(): void {
      this.usuarioService.addUsuario(this.usuario)
      .subscribe(
        data => {
         alert('Usuario cadastrado');
         this.router.navigate([this.returnUrl]);
       },
       erro => alert(erro));
   }
}
