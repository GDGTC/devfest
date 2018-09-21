import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'environments/environment';
import { FireJoinPipe } from './fire-join.pipe';
import { AuthService } from './auth.service';

@NgModule({
    declarations: [
        FireJoinPipe,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        AngularFirestoreModule,
    ],
    providers: [
        AuthService,
    ],
    exports: [
        FireJoinPipe,
    ]
})
export class RealtimeDataModule {
    constructor() {
        console.log('Constructing realtime data module.');
    }
}
