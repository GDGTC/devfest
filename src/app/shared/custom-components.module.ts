import { NgModule, Pipe } from '@angular/core';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../shared/dialog.component';

@Pipe({
	name : "removeSpaces"
})
 
export class RemoveSpaces{
	transform(value){
        if(value){
    		return value.replace(/ /g, "-");
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
        }, {method: AuthMethods.Popup, provider: AuthProviders.Google})
    ],
    exports: [
        FireJoinPipe, 
        DialogComponent,
        RemoveSpaces,
    ],
    declarations: [
        FireJoinPipe,
        DialogComponent,
        RemoveSpaces,
    ]
})
export class CustomPipesModule {}