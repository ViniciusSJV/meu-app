import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthAdm implements CanActivate {
    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

        if (usuarioLogado.admin) {
            return true;
        }

        alert('Acesso não permitido.');
        this.router.navigate(['/usuario']);
        return false;
    }
}
