import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class Auth implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('usuarioLogado')) {
            return true;
        }

        alert('Faça login para continuar.');
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
