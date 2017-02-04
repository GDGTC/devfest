import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/empty';


@Injectable()
export class AuthService {
    isAdmin: Observable<boolean>;
    isVolunteer: Observable<boolean>;
    isAdminOrVolunteer: Observable<boolean>;
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
        }).filter(agenda => !!agenda);
        this.agenda
            .subscribe(next => localStorage.setItem('agendaCache', JSON.stringify(next)));
        this.agenda = this.agenda
            .startWith(JSON.parse(localStorage.getItem('agendaCache')))
            .filter(x => !!x)
            .shareResults();

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

        this.isVolunteer = this.af.auth.switchMap( authState => {
            if(!authState) {
                return Observable.of(false);
            } else {
                return this.af.database.object('devfest2017/volunteers/'+authState.uid)
                .catch((a,b) => {
                    return Observable.of(false);
                })
            }
        }).map( volunteerObject => (volunteerObject && volunteerObject['$value'] === true));

        this.isAdminOrVolunteer = Observable.combineLatest(this.isAdmin, this.isVolunteer, (x, y) => (x || y))
    }
    login() {
        this.af.auth.login();
    }
    logout() {
        this.af.auth.logout();
    }

 
}