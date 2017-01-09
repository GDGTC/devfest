import { Component } from '@angular/core';


import { DataService } from './shared/data.service';


@Component({
    templateUrl: './schedule.component.html',
})
export class ScheduleComponent {

    timeSlots;

    constructor(public ds: DataService ) {
        this.timeSlots = ds.timeSlots;
    }

    updateTrack(trackName) {

    }

    /**
     * Takes in an ISO 8601 datetime string
     * returns a friendly time e.g. "8 PM" in Minnesota Time
     */
    customDateFormatter(isoDateTime) {
        let dateTime = new Date(isoDateTime);
        let time = dateTime.getHours();
        time -= (6 - dateTime.getTimezoneOffset()/60)
        let indicator = "AM";
        if(time > 12) {
            time -= 12;
            indicator = "PM";
        }
        return `${time} ${indicator}`;

    }

}
