import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ThanksDialogComponent } from './thanks.dialog.component';
import { MatDialog } from '@angular/material';
import { AuthService } from '../shared/auth.service';
import { YearService } from '../year.service';
import { tap, switchMap, take, filter } from 'rxjs/operators';

@Component({
    selector: 'app-cfp',
    templateUrl: './cfp.component.html',
})
export class CFPComponent {
    cfp = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        title: ['', Validators.required],
        abstract: ['', Validators.required],
    });

    constructor(
        private store: AngularFirestore,
        private fb: FormBuilder,
        private dialog: MatDialog,
        public auth: AuthService,
        private yearService: YearService
    ) {
        auth.uid
            .pipe(
                tap(x => console.log('Id was', x)),
                switchMap(uid => this.store.doc(`years/${this.yearService.year}/proposals/${uid}`).valueChanges()),
                take(1),
                filter(x => !!x),
            )
            .subscribe(priorSubmission => this.cfp.setValue(priorSubmission));
    }

    submit(group, uid: string) {
        if (group.valid) {
            const proposal = this.store.doc(`years/${this.yearService.year}/proposals/${uid}`);
            proposal.set(group.value);
            this.dialog.open(ThanksDialogComponent);
        }
    }
}
