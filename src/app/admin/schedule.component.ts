import { Component } from '@angular/core';

import { AngularFire,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { AuthService } from '../shared/auth.service';
import { Speaker } from '../main/shared/models';


import { Observable } from 'rxjs/Observable';

const PATH = 'devfest2017'

@Component({
    templateUrl: './schedule.component.html',
    providers: [FirebaseService],
})
export class ScheduleComponent {
    schedule;
    speakers;

    editSession:any = {};
    editSpeaker = {};

    showDialog = false;

    speakerService: FirebaseTypedService<Speaker>;

    isVolunteer;

    constructor(public af: AngularFire, public fs: FirebaseService, public auth: AuthService) {
        this.speakerService = fs.attach<Speaker>(PATH + '/speakers/', {query: {orderByChild: 'name'}});
        this.schedule = af.database.list(PATH + '/schedule',{ query: { orderByChild: 'startTime' } });
        this.speakers = af.database.list(PATH + '/speakers', { query: { orderByChild: 'name' } });

        auth.isVolunteer.subscribe(status => this.isVolunteer = status);

    }
    saveSession(session) {
        event.preventDefault();
        if (session.$key) {
            let key = session.$key;

            delete session.$key;
            delete session.$exists;
            delete session.$value;

            if(this.isVolunteer) {
                // Volunteers can only update the notes
                console.log("volunteer update happening");
                this.af.database.object(`${PATH}/schedule/${key}`).update({notes:session.notes});
            } else {
                this.schedule.update(key, session);
            }
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