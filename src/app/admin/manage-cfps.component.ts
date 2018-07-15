import { Component } from '@angular/core';
import { YearService } from '../year.service';
import { AngularFirestore } from 'angularfire2/firestore';

interface Proposal {
    name: string;
    email: string;
    title: string;
    abstract: string;
}

@Component({
    templateUrl: './manage-cfps.component.html',
})
export class ManageCFPsComponent {
    cfps = this.store.collection<Proposal>(`/years/${this.yearService.year}/proposals/`).valueChanges();
    constructor(public yearService: YearService, private store: AngularFirestore) {

    }
}
