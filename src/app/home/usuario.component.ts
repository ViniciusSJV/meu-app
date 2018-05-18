import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../_servico/usuario.service';

import { Usuario } from '../_modelo/usuario';

@Component({
  selector: 'home',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[];
  usuarioLogado: Usuario;
  usuariosFiltrados: Usuario[];
  filtro;

  constructor(private usuarioService : UsuarioService) {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  }

  filtrar(){
      let usuariosCadastrados: Usuario[] = JSON.parse(localStorage.getItem('usuarios')) || [];
      this.usuariosFiltrados = [];
      if(this.filtro != "" || this.filtro != undefined){
            usuariosCadastrados.forEach(usuarioCadastrado => {
                if(usuarioCadastrado.usuario.toUpperCase().indexOf(this.filtro.toUpperCase()) >= 0 ||
                   usuarioCadastrado.nome.toUpperCase().indexOf(this.filtro.toUpperCase()) >= 0 ||
                   usuarioCadastrado.email.toUpperCase().indexOf(this.filtro.toUpperCase()) >= 0 ||
                   usuarioCadastrado.celular.toUpperCase().indexOf(this.filtro.toUpperCase()) >= 0){
                  this.usuariosFiltrados.push(usuarioCadastrado);
               }
            });
      }else{
         this.usuariosFiltrados = usuariosCadastrados;
      }
      this.usuarios = this.usuariosFiltrados;
   }

   resetar(){
     this.filtro = "";
     this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
   }

  getAllUsuarios() {
        this.usuarioService.getUsuarios().subscribe(
          body => this.usuarios = body,
          erro => alert(erro));
   }

  ngOnInit() {
    this.getAllUsuarios();
  }

}
