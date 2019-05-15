import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CFPComponent } from './cfp.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ThanksDialogComponent } from './thanks.dialog.component';
import { RealtimeDataModule } from '../realtime-data/realtime-data.module';

@NgModule({
    imports: [
        CommonModule,
        RealtimeDataModule,
        RouterModule.forChild([{ path: '', component: CFPComponent }]),
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        MatDialogModule,
        MatRadioModule,
    ],
    declarations: [CFPComponent, ThanksDialogComponent],
    entryComponents: [ThanksDialogComponent],
})
export class CFPModule {}
