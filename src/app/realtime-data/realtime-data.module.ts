import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
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
