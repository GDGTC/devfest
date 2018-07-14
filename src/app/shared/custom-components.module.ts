import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FireJoinPipe } from './fire-join.pipe';
import { CommonModule } from '@angular/common';
import { environment } from 'environments/environment';

@Pipe({
    name: 'encodeURI',
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
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
    ],
    exports: [FireJoinPipe, EncodeURI],
    declarations: [FireJoinPipe, EncodeURI],
})
export class CustomPipesModule {}
