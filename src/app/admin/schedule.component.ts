import { Component } from '@angular/core';

import { AngularFire,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { Speaker } from '../shared/models';


import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: './schedule.component.html',
    styleUrls: ['../shared/styles.css'],
    providers: [FirebaseService],
})

export class ScheduleComponent {
    isAdmin: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    schedule;
    speakers;
    scheduleTimes;
    rooms; 

    timeSlots;

    editSession:any = {};
    editSpeaker = {};

    showDialog = false;

    speakerService: FirebaseTypedService<Speaker>;

    constructor(public af: AngularFire, public fs: FirebaseService) {
        this.speakerService = fs.attach<Speaker>(PATH + '/speakers/', {query: {orderByChild: 'name'}});
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
        this.schedule = af.database.list(PATH + '/schedule',{ query: { orderByChild: 'title' } });
        this.speakers = af.database.list(PATH + '/speakers', { query: { orderByChild: 'name' } });
        this.scheduleTimes = af.database.list(PATH + '/scheduletimes',{query: {orderByChild: 'time'}});
        this.rooms = af.database.list(PATH + '/rooms');


         this.timeSlots = this.schedule
            // Invert the array to be time-indexed.
            .map(list => {
                let times = {};
                let rooms = {};
                for (let session of list) {
                    let index = session.startTime;
                    let roomindex = session.room.replace("'","");
                    //Make a collection of rooms
                    if(Array.isArray(rooms[roomindex])){
                        rooms[roomindex].push(session);
                    } else {
                        rooms[roomindex] = [session];
                    }
                    //Make a collection of times
                    if(!Array.isArray(times[index])){
                        times[index] = {};
                    }
                    if (Array.isArray(times[index][roomindex])) {
                        times[index][roomindex].push(session);
                    } else {
                        times[index][roomindex] = [session];
                    }

                }
//                delete times['UNK'];
                let sortedSlots = Object.keys(times).sort();
                let sortedRooms = Object.keys(rooms).sort();
                console.log(times);
                console.log(rooms);
                let sessionGrid = {};
                for (let slot of sortedSlots){
                    sessionGrid[slot] = {};
                    for (let room of sortedRooms){
                        if(Array.isArray(times[slot][room])){
                            sessionGrid[slot][room] = times[slot][room];
                        }
                        else {
                            sessionGrid[slot][room] = [];
                        }
                    }
                }
                console.log(sessionGrid);
                return { slots: sortedSlots, sessions: times, rooms: sortedRooms, sessiongrid: sessionGrid };
            });

        // Local Cache
        this.timeSlots.subscribe(next => {
            localStorage.setItem("scheduleCache", JSON.stringify(next));
        });

        this.timeSlots = this.timeSlots
            .startWith(localStorage.getItem("scheduleCache"))
            .shareResults();

    }
    login() {
        this.af.auth.login();
    }
    saveSession(session) {
        event.preventDefault();
        if (session.$key) {
            let key = session.$key;

            delete session.$key;
            delete session.$exists;
            delete session.$value;

            this.schedule.update(key, session);
        } else {
            this.schedule.push(session);
        }
        this.editSession = {};
        this.showDialog = false;
    }
    deleteSession(key){
        this.schedule.remove(key);
    }
    deleteSpeakerFromSession(speakerId:string){

        var currentSpeakers = this.editSession.speakers;
        console.log(currentSpeakers);
        var index = currentSpeakers.indexOf(speakerId);
        if (index > -1) {
            currentSpeakers.splice(index, 1);
        }

        this.editSession.speakers = currentSpeakers;
        let key = this.editSession.$key;

        delete this.editSession.$key;
        delete this.editSession.$exists;
        delete this.editSession.$value;

        this.schedule.update(key, this.editSession);
        this.editSession.$key = key;
    }

    // findLessonById(speakerId:string):Observable<Lesson> {
    //     return this.db.object(`lessons/${lessonId}`)
    //     .map(Lesson.fromJson);
    // }

    // Attempt at doing a Speaker Lookup.... abandoned
    findSpeakerName(speakerId:string){
        console.log(this.speakers);              
        var ans =  this.speakers.filter(speaker => {
            return speaker.$key == speakerId;
        });
        console.log(ans);
        return ans;
    }

    //  attempted Firebase Name lookup... abandoned
    findSpeakerById(speakerId:string):Observable<any[]>{
        var ans = "";
        console.log(speakerId);
        var speakerPath = PATH + `/speakers/` + speakerId;
        console.log(speakerPath);
        var speakers = this.af.database.object(speakerPath);
        console.log(speakers);
        return speakers;
    }

}