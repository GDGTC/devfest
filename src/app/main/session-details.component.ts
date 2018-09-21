import { Component, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { switchMap, map } from 'rxjs/operators';
import { DataService, Session } from '../shared/data.service';
import { AuthService } from '../realtime-data/auth.service';

@Component({
    selector: 'session-details',
    templateUrl: 'session-details.component.html',
})
export class SessionDetailsComponent {
    @Input()
    session: Session;
    @Input()
    year;

    sessionAgenda: AngularFireObject<any>;
    agendaInfo = this.route.params.pipe(
        switchMap(params => {
            this.year = params['year'];
            return this.auth.uid.pipe(map(uid => ({ id: params['id'], uid: uid })));
        })
    );

    constructor(
        private route: ActivatedRoute,
        public ds: DataService,
        public auth: AuthService,
        public db: AngularFireDatabase
    ) {
        this.agendaInfo.subscribe(agendaData => {
            let { id, uid } = agendaData;
            if (id && uid) {
                this.sessionAgenda = this.ds.getAgenda(uid, id);
                console.log('Session agenda is set to', this.sessionAgenda);
            } else {
                this.sessionAgenda = null;
            }
        });
    }

    addToAgenda() {
        if (this.sessionAgenda) {
            this.sessionAgenda.set({ value: true });
        } else {
            console.error('Cannot modify agenda as we do not have a path or user');
        }
    }
    removeFromAgenda() {
        if (this.sessionAgenda) {
            this.sessionAgenda.remove();
        } else {
            console.error('Cannot modify agenda as we do not have a path or user');
        }
    }
}
