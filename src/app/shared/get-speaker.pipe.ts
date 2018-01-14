import { Pipe, PipeTransform } from '@angular/core';
import { DataService, Session } from './data.service';

/**
 * Take a speaker ID and returns a speaker
 *
 * example template expression:
 * {{ (community | getSpeaker | async)?.name }}
 */
@Pipe({ name: 'getSpeaker' })
export class GetSpeakerPipe implements PipeTransform {
    constructor(private ds: DataService) {}

    transform(value: string): any {
        if (value) {
            let speakers = this.ds.getSpeakers();
            return speakers.map(list => {
                if (list) {
                    return list.find(item => item.$key == value);
                } else {
                    return null;
                }
            });
        }
    }
}
