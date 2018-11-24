import { Component, Pipe, PipeTransform } from '@angular/core';
import { YearService } from '../year.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { DataService } from 'app/shared/data.service';
import { AngularFireDatabase } from '@angular/fire/database';

interface Proposal {
    name: string;
    email: string;
    title: string;
    abstract: string;
    date: string;
    approved?: boolean;
}

@Component({
    templateUrl: './manage-cfps.component.html',
})
export class ManageCFPsComponent {
    cfps = this.store.collection<Proposal>(`/years/${this.yearService.year}/proposals/`).snapshotChanges()
    .pipe(
        map(actions =>

        actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return {id, ...data};
        })
      )
    );
    constructor(public yearService: YearService, private store: AngularFirestore, public db: AngularFireDatabase) {}
    reject(cfp) {
        confirm('you sure bout dat?');
        alert(`it would be so cool if this could email!`);
    }
    approve(cfp) {
        console.log(`attempting to approve`, cfp);
        const speakers = this.db.list(`/devfest${this.yearService.year}/speakers/`);
        const schedule = this.db.list(`/devfest${this.yearService.year}/schedule/`);

        const speakerEntry = {
            bio: cfp.bio,
            company: cfp.company,
            name: cfp.name,
            twitter: cfp.twitter,
            speakerUserId: cfp.id
        };

        const speakerKey = speakers.push(speakerEntry).key;
        console.log('speaker created with key', speakerKey);
        const scheduleEntry = {
            title: cfp.title,
            description: cfp.abstract,
            startTime: '2018-01-01T08:00:00-06:00',
            endTime: '2018-01-01T09:00:00-06:00',
            track: cfp.technology,
            difficulty: cfp.difficulty,
            speakers: [
                speakerKey,
            ]
        }
        const scheduleKey = schedule.push(scheduleEntry).key;
        console.log('session created with key', scheduleKey);

        const originalCFP = this.store.doc<Proposal>(`/years/${this.yearService.year}/proposals/${cfp.id}`)
        originalCFP.update({approved: true});


    }
}

@Pipe({ name: 'ignoreFields' })
export class IgnoreFields implements PipeTransform {
    transform(value: any[], ignored: string[]) {
        const newValue = [];
        for (const item of value) {
            if (ignored.indexOf(item.key) < 0) {
                newValue.push(item);
            }
        }
        return newValue;
    }
}
