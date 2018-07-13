import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CFPComponent } from './cfp.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule } from '@angular/material';
import { ThanksDialogComponent } from './thanks.dialog.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: CFPComponent }]),
        AngularFirestoreModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
    ],
    declarations: [CFPComponent, ThanksDialogComponent],
})
export class CFPModule {}
