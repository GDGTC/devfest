import { Component, Pipe} from '@angular/core';

import { AngularFire,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseService, FirebaseTypedService } from './shared/firebase.service';

import { Observable } from 'rxjs/Observable';

import {MdRipple } from '@angular/material/core/core';

const PATH = 'devfest2017'

@Component({
    templateUrl: './schedule.component.html',
    styleUrls: ['./shared/styles.css'],
    providers: [FirebaseService],
})
export class ScheduleComponent {

    schedule;
    times;

    tracks = [];

    public checkButtonModel:any = {Keynote: false, Android: false, Web: false, Cloud: false, Design: false, IoT: false};

    constructor(public af: AngularFire) {

        this.schedule = af.database.list(PATH + '/schedule', { query: { orderByChild: 'title'} });
        this.times = af.database.list(PATH + "/scheduletimes");
    }
    updateTrack(track){
        console.log(track);
    }

    updatePie(pie){
        console.log(pie);//this.favoritePie.push(pie);
    }

     buttonOpacity = 0.1;


}