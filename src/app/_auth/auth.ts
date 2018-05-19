import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AlertaService } from '../_servico/alerta.service';

@Injectable()
export class Auth implements CanActivate {

    constructor(private router: Router, private alertaService: AlertaService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('usuarioLogado')) {
            return true;
        }

        this.alertaService.error('Faça login para continuar.');
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
