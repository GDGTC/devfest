import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/empty';

import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    isAdmin: Observable<boolean>;
    isVolunteer: Observable<boolean>;
    isAdminOrVolunteer: Observable<boolean>;
    uid: Observable<string | false>;
    name: Observable<string | false>;

    agenda: Observable<any>;
    feedback: Observable<any>;

    constructor(public auth: AngularFireAuth, public db: AngularFireDatabase) {
        this.uid = auth.authState.map(authState => {
            if (authState) {

                return authState.uid;
            } else {
                return false;
            }
        });
        this.name = auth.authState.map(authState => {
            console.log(authState);
            if (authState) {
                return authState.displayName || authState.providerData[0].displayName;
            } else {
                return false;
            }
        });
        this.agenda = auth.authState.switchMap(authState => {
            if (authState && authState.uid) {
                return db.list(`devfest2017/agendas/${authState.uid}`)
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

        this.isAdmin = this.auth.authState.switchMap(authState => {
            if (!authState) {
                return Observable.of(false);
            } else {
                return this.db.object('/admin/' + authState.uid);
            }
        }).map(adminObject =>
            (adminObject && adminObject['$value'] === true)
            );

        this.isVolunteer = this.auth.authState.switchMap(authState => {
            if (!authState) {
                return Observable.of(false);
            } else {
                return this.db.object('devfest2017/volunteers/' + authState.uid);
            }
        }).map(volunteerObject => (volunteerObject && volunteerObject['$value'] === true));

        this.isAdminOrVolunteer = Observable.combineLatest(this.isAdmin, this.isVolunteer, (x, y) => (x || y))
    }
    login() {
        this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
        this.auth.auth.signOut()
    }


}
