import { Component } from '@angular/core';

import { AngularFire,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';


import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: './schedule.component.html'
})
export class ScheduleComponent {
    isAdmin: Observable<boolean>;
    uid: Observable<string>;
    name: Observable<string>;

    schedule;
    speakers;

    editSession = {};
    editSpeaker = {};

    showDialog = false;

    constructor(public af: AngularFire) {
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
        this.schedule = af.database.list(PATH + '/schedule',{ query: { orderByChild: 'startTime' } });

        //  Atempt at mapping the Speakers to the speaker element in the Session.  ... abandoned
//         this.schedule = af.database.list(PATH + '/schedule')
// //            .map(items => items.sort((a, b) => a.startTime - b.startTime))
//             .map(schedule => {
//                 schedule.map(session=>{
//                     session.speakers.map(speaker=> {
//                         this.af.database.list(PATH + '/speakers')
//                         .subscribe(sp => {
//                             speaker = sp;
//                         });
//                     });
//                     return session;
//                 });
//                 return schedule;
//             }) as Observable<any[]>
//         ;

        this.speakers = af.database.list(PATH + '/speakers', { query: { orderByChild: 'name' } });

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