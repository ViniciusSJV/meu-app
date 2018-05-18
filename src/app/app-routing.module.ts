import { RouterModule, Routes } from '@angular/router';
import { NgModule }      from '@angular/core';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './home/usuario.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

import { Auth } from './_auth/auth';
import { AuthAdm } from './_auth/authAdm';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: UsuarioComponent, canActivate: [Auth] },
  { path: 'login', component: LoginComponent },
	{ path: 'cadastro', component: CadastroComponent, canActivate: [AuthAdm] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule{ }
