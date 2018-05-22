import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../_servico/usuario.service';
import { AlertaService } from '../_servico/alerta.service';

import { Usuario } from '../_modelo/usuario';

@Component({
  moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuarios: Usuario[];
  usuarioLogado: Usuario;
  filtro;
  private filterString:Subject<string> = new Subject<string>();

  constructor( private usuarioService: UsuarioService, private alertaService: AlertaService ) { }

  deleteUsuario(id: number) {
        this.usuarioService.deleteUsuario(id).subscribe(
            data => {
                this.alertaService.success('Usuario excluido', true);
                this.getAllUsuarios();
            },
            error => {
                this.alertaService.error(error);
            });
  }

  private getAllUsuarios() {
      this.usuarioService.getUsuarios().subscribe(usuarios => { this.usuarios = usuarios; });
  }

  filtrar() {
    this.filterString
        .debounceTime(300)
        .switchMap(filtro => this.usuarioService.getUsuariosFiltrados(filtro))
        .catch(error => this.alertaService.error(error));
   }
  
  handleFilterChange(value: string) {
    this.filterString.next(value);
  }

   resetar() {
     this.filtro = '';
     this.getAllUsuarios();
   }

  ngOnInit() {
    this.usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    this.getAllUsuarios();
  }

}
