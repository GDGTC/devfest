import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/operators';

/**
 * Take a firebase key and do another lookup
 * Returns an observable of the object referred to by the key
 *
 * example template expression:
 * {{ (community | fireJoin:'/communities/' | async)?.name }}
 */
@Pipe({ name: 'fireJoin' })
export class FireJoinPipe implements PipeTransform {
    constructor(private fs: FirebaseService) {
        console.log('constructing pipe with fs', fs);
    }

    transform(value: string, destination: string): any {
        if (value && destination &&this.fs) {
            let service = this.fs.attach<any>(destination);
            return service.list.pipe(map(list => list.find(item => item.$key === value)));
        }
    }
}
