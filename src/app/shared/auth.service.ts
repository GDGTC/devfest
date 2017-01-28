import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';


@Injectable()
export class AuthService {
    isAdmin: Observable<boolean>;
    uid: Observable<string|false>;
    name: Observable<string|false>;

    agenda: Observable<any>;
    feedback: Observable<any>;

    constructor(public af: AngularFire) {
        this.uid = af.auth.map(authState => {
            if (authState && authState.google) {
                
                return authState.uid;
            } else {
                return false;
            }
        });
        this.name = af.auth.map(authState => {
            if (authState && authState.google) {
                return authState.google.displayName;
            } else {
                return false;
            }
        });
        this.agenda = af.auth.switchMap(authState => {
            if (authState && authState.uid ) {
                return af.database.list(`devfest2017/agendas/${authState.uid}`)
            } else {
                return Observable.empty();
            }
        });

        this.isAdmin =  this.af.auth.switchMap( authState => {
            if(!authState) {
                return Observable.of(false);
            } else {
                return this.af.database.object('/admin/'+authState.uid)
                .catch((a, b) => {
                    // This permission error means we aren't an admin
                    return Observable.of(false)
                });
            }
        }).map( adminObject => 
             (adminObject && adminObject['$value'] === true)
        );

    }
    login() {
        this.af.auth.login();
    }
    logout() {
        this.af.auth.logout();
    }

 
}