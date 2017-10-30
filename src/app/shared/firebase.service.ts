import { Injectable, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';

export interface HasKey {
    $key?: string;
    $exists?: string;
}

export class FirebaseTypedService<T extends HasKey> {
    endpoint: string;
    firebaseList: FirebaseListObservable<T[]>;
    list: Observable<T[]>;

    constructor(private db: AngularFireDatabase) { }

    get(key): Observable<T> {
        if (key == 'new') {
            let empty: T;
            return Observable.of(empty);
        }
        let observer: FirebaseObjectObservable<T> = this.db.object(this.endpoint + key);
        return observer.map(item => {
            item.$key = key;
            return item
        });
    }
    new(item: T): any {
        let result = this.firebaseList.push(item);
        console.log(result);
        result.then(success => console.log("successfully added new item to " + this.endpoint, success), failure => console.log("failure", failure));
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
    constructor(private db: AngularFireDatabase) {
    }

    // Factory that returns little generic FirebaseTypedService
    attach<V extends HasKey>(endpoint: string, query?): FirebaseTypedService<V> {
        let service = new FirebaseTypedService<V>(this.db);
        service.endpoint = endpoint;
        service.firebaseList = this.db.list(endpoint, query);
        service.list = service.firebaseList;
        return service;
    }

}
