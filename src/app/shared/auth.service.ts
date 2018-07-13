import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { YearService } from 'app/year.service';
import * as firebase from 'firebase/app';
import {
    combineLatest,
    empty as observableEmpty,
    Observable,
    of as observableOf
    } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import {
    filter,
    map,
    shareReplay,
    startWith,
    switchMap
    } from 'rxjs/operators';
import { Feedback } from './data.service';



@Injectable()
export class AuthService {
    isAdmin: Observable<boolean>;
    isVolunteer: Observable<boolean>;
    isAdminOrVolunteer: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    agenda: Observable<any>;
    feedback: Observable<Feedback>;

    constructor(public auth: AngularFireAuth, public db: AngularFireDatabase, yearService: YearService) {
        this.uid = auth.authState.pipe(
            map(authState => {
                if (authState) {
                    return authState.uid;
                } else {
                    return null;
                }
            })
        );
        this.name = auth.authState.pipe(
            map(authState => {
                console.log(authState);
                if (authState) {
                    return authState.displayName || authState.providerData[0].displayName;
                } else {
                    return null;
                }
            })
        );
        this.agenda = auth.authState
            .pipe(
                switchMap(authState => {
                    if (authState && authState.uid) {
                        let year = yearService.year;
                        return db.list(`devfest${year}/agendas/${authState.uid}`).valueChanges();
                    } else {
                        return observableEmpty();
                    }
                })
            )
            .pipe(filter(agenda => !!agenda))
            .pipe(shareReplay(1));
        this.agenda.subscribe(next => {
            localStorage.setItem('agendaCache', JSON.stringify(next));
        });
        this.agenda = this.agenda.pipe(
            startWith(JSON.parse(localStorage.getItem('agendaCache'))),
            filter(x => !!x),
            shareReplay(1),
        );

        this.isAdmin = this.auth.authState
            .pipe(
                switchMap(authState => {
                    if (!authState) {
                        return observableOf(false);
                    } else {
                        return this.db
                            .object('/admin/' + authState.uid)
                            .valueChanges()
                    }
                }),
                map(value => !!value),
                shareReplay(1),
            );

        this.isVolunteer = this.auth.authState
            .pipe(
                switchMap(authState => {
                    if (!authState) {
                        return observableOf(false);
                    } else {
                        return this.db.object('devfest2017/volunteers/' + authState.uid).valueChanges();
                    }
                })
            )
            .pipe(map(volunteerObject => volunteerObject && volunteerObject['$value'] === true));

        this.isAdminOrVolunteer = combineLatest(this.isAdmin, this.isVolunteer, (x, y) => x || y);
    }
    login() {
        this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
    logout() {
        this.auth.auth.signOut();
    }
}
