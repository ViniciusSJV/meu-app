import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroEditComponent } from './cadastro/cadastro-edit.component';
import { LoginComponent } from './login/login.component';

import { Auth } from './_auth/auth';
import { AuthAdm } from './_auth/authAdm';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [Auth] },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro-edit/:id', component: CadastroEditComponent, canActivate: [AuthAdm] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
