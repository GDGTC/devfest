import { Component } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { ThanksDialogComponent } from './thanks.dialog.component';
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-cfp',
    templateUrl: './cfp.component.html',
})
export class CFPComponent {
    proposals = this.store.collection('/proposals/');
    cfp = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        title: ['', Validators.required],
        abstract: ['', Validators.required],
    });

    constructor(private store: AngularFirestore, private fb: FormBuilder, private dialog: MatDialog) {
        this.cfp.setValue({name: 'Test Person', email: 'email@example.org', title: 'Talk Title', abstract: 'Talk Abstract'});
    }

    submit(group) {
        if (group.valid) {
            this.proposals.add(group.value);
            this.dialog.open(ThanksDialogComponent);
        }
    }
}
