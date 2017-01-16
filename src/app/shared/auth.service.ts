import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService {
    isAdmin: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    agenda: Observable<any>;
    feedback: Observable<any>;

    constructor(public af: AngularFire) {
        this.uid = af.auth.map(authState => {
            if (authState && authState.google) {
                
                return authState.uid;
            } else {
                return null;
            }
        });
        this.name = af.auth.map(authState => {
            if (authState && authState.google) {
                return authState.google.displayName;
            } else {
                return null;
            }
        });
        this.agenda = af.auth.switchMap(authState => {
            if (authState && authState.uid ) {
                return af.database.list(`devfest2017/agendas/${authState.uid}`)
            } else {
                return Observable.empty();
            }
        });
        //console.log("Agenda is defined.");

    }
    login() {
        this.af.auth.login();
    }
    logout() {
        this.af.auth.logout();
    }

 
}