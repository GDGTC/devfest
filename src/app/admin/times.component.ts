import { Component } from '@angular/core';

import { AngularFire,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { Speaker } from '../shared/models';


import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: './times.component.html',
    providers: [FirebaseService],
})
export class TimesComponent {
    isAdmin: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    times;
    sessions = [];

    editTime = {};
    editSession = {};

    showDialog = false;

    //speakerService: FirebaseTypedService<Speaker>;

    constructor(public af: AngularFire, public fs: FirebaseService) {
        //this.speakerService = fs.attach<Speaker>(PATH + '/speakers/', {query: {orderByChild: 'name'}});        
        this.uid = af.auth.map(authState => {
            if (authState && authState.google) {
                return authState.google.uid;
            } else {
                return null;
            }
        });
        this.name = af.auth.map(authState => {
            if (authState && authState.google) {
                return authState.google.displayName;
            } else {
                return null;
            }
        });
        this.times = af.database.list(PATH + '/times',{ query: { orderByChild: 'time' } });


    }
    login() {
        this.af.auth.login();
    }
    atime;
    saveTime(time) {
        event.preventDefault();
        let key = time.name;

        delete time.$key;
        delete time.$exists;
        delete time.$value;

        this.sessions = [];
        this.atime = time.time;
        let sessions = this.af.database.list(PATH+'/schedule',{query:{orderByChild: 'startTime', equalTo: time.time}}).map(i=>{return i});
        sessions.forEach(i=>i.forEach(element => { 
            console.log(element.startTime);
            console.log(this.atime);
            if (time.time == element.startTime){
                console.log(element.title);
                delete element.$key;
                delete element.$exists;
                this.sessions.push(element);
            }
        }));
            //     )
            // .flatMap(list => list)
            // //Transform the value
            // .map(({title, firebaseKey}) => ({name, firebaseKey}))
            // .subscribe(x => {
                
            //     console.log(x);
            //     this.sessions= x;
            //     time.sessions = x;
            //     // time.sessions.map().forEach(element => {
            //     //     delete element.$key;
            //     //     delete element.$exists;
            //     // });
            //     // this.times.update(key,time);
            // });
//        this.sessions = [];
//        sessions.subscribe(items => items.forEach(item => this.sessions.push(item) ) );
        
        time.sessions = this.sessions;



        this.times.update(key, time);
        this.editTime = {};
        this.showDialog = false;
    }
    deleteTime(key){
        this.times.remove(key);
    }

}