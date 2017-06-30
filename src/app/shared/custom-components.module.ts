import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';
import { CommonModule } from '@angular/common';

@Pipe({
    name: "encodeURI"
})
export class EncodeURI implements PipeTransform {
    transform(value) {
        if (value) {
            return value.replace(/[()]/g, '').replace(/ /g, '-');
        }
    }
}

@NgModule({
    imports: [
        CommonModule,
        AngularFireModule.initializeApp({
            apiKey: "AIzaSyBrWJx91j512T3q6AaTGNxu_3fq47bYhfg",
            authDomain: "devfestmn.firebaseapp.com",
            databaseURL: "https://devfestmn.firebaseio.com",
            storageBucket: "firebase-devfestmn.appspot.com",
        }),
        AngularFireDatabaseModule,
        AngularFireAuthModule,
    ],
    exports: [
        FireJoinPipe,
        EncodeURI,
    ],
    declarations: [
        FireJoinPipe,
        EncodeURI,
    ]
})
export class CustomPipesModule { }
