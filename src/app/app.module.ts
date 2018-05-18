import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './home/usuario.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';

import { UsuarioService } from './_servico/usuario.service';
import { LoginService } from './_servico/login.service';

import { AppRoutingModule }  from './app-routing.module';

import { Auth } from './_auth/auth';
import { AuthAdm } from './_auth/authAdm';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    LoginComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
		AppRoutingModule,
    CommonModule
  ],
  providers: [
    UsuarioService,
    Auth,
    AuthAdm,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
