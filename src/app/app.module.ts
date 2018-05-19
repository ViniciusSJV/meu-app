import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { BackendProvider } from './_back-end/backEndInterceptor';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CadastroEditComponent } from './cadastro/cadastro-edit.component';
import { LoginComponent } from './login/login.component';
import { AlertaComponent } from './alerta/alerta.component';
import { LogoutComponent } from './logout/logout.component';

import { UsuarioService } from './_servico/usuario.service';
import { LoginService } from './_servico/login.service';
import { AlertaService } from './_servico/alerta.service';

import { AppRoutingModule } from './app-routing.module';

import { Auth } from './_auth/auth';
import { AuthAdm } from './_auth/authAdm';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertaComponent,
    LoginComponent,
    LogoutComponent,
    CadastroEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule
  ],
  providers: [
    UsuarioService,
    AlertaService,
    BackendProvider,
    Auth,
    AuthAdm,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
