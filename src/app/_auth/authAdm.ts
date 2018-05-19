import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AlertaService } from '../_servico/alerta.service';

@Injectable()
export class AuthAdm implements CanActivate {
    constructor(private router: Router, private alertaService: AlertaService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

        if (usuarioLogado.admin) {
            return true;
        }

        this.alertaService.error('Acesso não permitido.');
        this.router.navigate(['home']);
        return false;
    }
}
