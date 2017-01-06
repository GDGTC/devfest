import { Component } from '@angular/core';

import { AngularFire,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { Speaker } from '../shared/models';


import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: './tracks.component.html',
    styleUrls: ['../shared/styles.css'],
    providers: [FirebaseService],
})
export class TracksComponent {
    isAdmin: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    tracks;

    editTrack = {};

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
        this.tracks = af.database.list(PATH + '/tracks',{ query: { orderByChild: 'startTime' } });


    }
    login() {
        this.af.auth.login();
    }
    saveTrack(track) {
        event.preventDefault();
        let key = track.name;

        delete track.$key;
        delete track.$exists;
        delete track.$value;

        this.tracks.update(key, track);
        this.editTrack = {};
        this.showDialog = false;
    }
    deleteTrack(key){
        this.tracks.remove(key);
    }

}