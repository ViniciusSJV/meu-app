import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../_servico/login.service';
import { Usuario } from '../_modelo/usuario';

@Component({
    moduleId: module.id,
    selector: 'app-logout',
    templateUrl: 'logout.component.html',
    styleUrls: ['./logout.component.css']
})

export class LogoutComponent {

    constructor( private loginService: LoginService,
                private router: Router ) { }

    logout() {
        this.loginService.logout();
        this.router.navigate(['login']);
    }

}
