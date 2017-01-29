import { Pipe, PipeTransform } from '@angular/core';
import { DataService, Session } from './data.service';

/**
 * Take a spekaer ID and returns a speaker
 * 
 * example template expression:
 * {{ (community | fireJoin:'/communities/' | async)?.name }}
 */
@Pipe({ name: 'getSpeaker' })
export class GetSpeakerPipe implements PipeTransform {
    constructor(private ds: DataService) { }

    transform(value: string): any {
        if (value) {
            let speakers = this.ds.speakers;
            return speakers.map(list => list.find(item => item.$key == value));
        }
    }
}