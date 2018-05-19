import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Alerta, AlertaType } from '../_modelo/alerta';

@Injectable()
export class AlertaService {
    private subject = new Subject<Alerta>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    this.keepAfterRouteChange = false;
                } else {
                    this.clear();
                }
            }
        });
    }

    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertaType.Success, message, keepAfterRouteChange);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.alert(AlertaType.Error, message, keepAfterRouteChange);
    }

    alert(type: AlertaType, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<Alerta>{ type: type, message: message });
    }

    getMensagem(): Observable<any> {
        return this.subject.asObservable();
    }

    clear() {
        this.subject.next();
    }
}
