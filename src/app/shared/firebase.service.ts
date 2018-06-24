import { of as observableOf, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable, Type } from '@angular/core';
import {
    AngularFireDatabase,
    AngularFireList,
    AngularFireObject,
} from 'angularfire2/database';

export interface HasKey {
    $key?: string;
    $exists?: string;
}

export class FirebaseTypedService<T extends HasKey> {
    endpoint: string;
    firebaseList: AngularFireList<T>;
    list: Observable<T[]>;

    constructor(private db: AngularFireDatabase) {}

    get(key): Observable<{key: string, value:T}> {
        if (key == 'new') {
            let empty: T;
            return observableOf({key: '', value: empty});
        }
        let observer: AngularFireObject<T> = this.db.object<T>(this.endpoint + key);
        return observer.snapshotChanges()
        .pipe(
            map(action => ({key: action.key, value: action.payload.val()}))
        );
    }
    new(item: T): any {
        let result = this.firebaseList.push(item);
        console.log(result);
        result.then(
            success => console.log('successfully added new item to ' + this.endpoint, success),
            failure => console.log('failure', failure)
        );
        return result;
    }

    // This method is fighting angularfire. HERE BE DRAGONS
    // I manually remove the key (which I need so I know where to write to),
    // and then add it back
    save(item: T): T {
        let key, exists;
        key = item.$key;
        delete item.$key;
        exists = item.$exists;
        delete item.$exists;
        if (key === 'new') {
            key = this.new(item).key;
        } else {
            this.db.object(this.endpoint + key).update(item);
        }
        item.$key = key;
        item.$exists = exists;
        return item;
    }

    delete(item: T) {
        let key = item.$key;
        if (key) {
            this.db.object(this.endpoint + key).remove();
        }
    }
}

@Injectable()
export class FirebaseService {
    constructor(private db: AngularFireDatabase) {}

    // Factory that returns little generic FirebaseTypedService
    attach<V extends HasKey>(endpoint: string, query?): FirebaseTypedService<V> {
        let service = new FirebaseTypedService<V>(this.db);
        service.endpoint = endpoint;
        service.firebaseList = this.db.list(endpoint, query);
        service.list = service.firebaseList.valueChanges();
        return service;
    }
}
