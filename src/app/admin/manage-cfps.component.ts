import { Component, Pipe, PipeTransform } from '@angular/core';
import { YearService } from '../year.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
    constructor(public yearService: YearService, private store: AngularFirestore) {}
    reject(cfp) {
        confirm('you sure bout dat?');
        alert(`it would be so cool if this could email!`);
    }
    approve(cfp) {

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
