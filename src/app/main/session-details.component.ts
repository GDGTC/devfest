import { Component, Input } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { DataService, Session } from '../shared/data.service';

@Component({
    selector: 'session-details',
    templateUrl: 'session-details.component.html',
})
export class SessionDetailsComponent {
    @Input() session: Session;
    @Input() year;

    sessionAgenda: FirebaseObjectObservable<any>;
    agendaInfo;

    constructor(router: Router, route: ActivatedRoute, public ds: DataService, public auth: AuthService, public db: AngularFireDatabase) {

        this.agendaInfo = route.params.pipe(switchMap(params => {
            this.year = params['year'];
            return auth.uid.map(uid =>
                [params['id'], uid]
            );
        }));

        this.agendaInfo.subscribe(agendaData => {
            let [session, uid] = agendaData;
            this.sessionAgenda = this.ds.getAgenda(uid, session);
        });
    }

    addToAgenda() {
        this.sessionAgenda.set({ value: true });
    }
    removeFromAgenda() {
        this.sessionAgenda.remove();
    }
}
