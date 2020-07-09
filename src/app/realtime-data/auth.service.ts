import { Injectable, Inject, Injector } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { YearService } from '../year.service';
import * as firebase from 'firebase/app';
import { combineLatest, empty as observableEmpty, Observable, of as observableOf } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Feedback } from '../shared/data.service';
import { localstorageCache } from '../shared/localstorage-cache.operator';

@Injectable()
export class AuthService {
    isAdmin: Observable<boolean>;
    isVolunteer: Observable<boolean>;
    isAdminOrVolunteer: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    agenda: Observable<any>;
    feedback: Observable<Feedback>;

    state = this.auth.authState.pipe(shareReplay(1));

    constructor(
        private auth: AngularFireAuth,
        private db: AngularFireDatabase,
        yearService: YearService
    ) {
        this.uid = this.state.pipe(
            map(authState => {
                if (authState) {
                    return authState.uid;
                } else {
                    return null;
                }
            })
        );
        this.name = this.state.pipe(
            map(authState => {
                if (authState) {
                    return authState.displayName || authState.providerData[0].displayName;
                } else {
                    return null;
                }
            })
        );
        /** Used to filter the agenda of a user on the schedule */
        this.agenda = this.state.pipe(
            switchMap(authState => {
                if (authState && authState.uid) {
                    let year = yearService.year;
                    return this.db.list<any>(`devfest${year}/agendas/${authState.uid}`).snapshotChanges().pipe(
                        map(actions => actions.map(a => {
                            const value = a.payload.val();
                            const key = a.payload.key;
                            console.log('payload includes', a.payload);
                            return { key: key, ...value };
                          })
                    )
                    );
                } else {
                    return observableEmpty();
                }
            }),
            localstorageCache(`agendaCache${yearService.year}`)
        );

        this.isAdmin = this.state.pipe(
            switchMap(authState => {
                if (!authState) {
                    return observableOf(false);
                } else {
                    return this.db.object('/admin/' + authState.uid).valueChanges();
                }
            }),
            map(value => !!value),
            localstorageCache('isAdmin')
        );

        this.isVolunteer = this.state
            .pipe(
                switchMap(authState => {
                    if (!authState) {
                        return observableOf(false);
                    } else {
                        return this.db
                            .object('devfest2017/volunteers/' + authState.uid)
                            .valueChanges();
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
