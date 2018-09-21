import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { map } from 'rxjs/operators';

import { DataService } from '../shared/data.service';


@Component({
    template: `
    <h2>Manage Volunteers</h2>
    <div>
        Add volunteer with ID: <input [(ngModel)]="id"><button type="button" (click)="set(id, true)">Add</button>
    </div>

    <div *ngFor="let volunteer of volunteerList | async">
        {{volunteer}} (<a href="#" (click)="set(volunteer, null)">x</a>)
    </div>

    `
})
export class VolunteersComponent {
    volunteers: AngularFireObject<any>;
    volunteerList;
    id = '';
    constructor(db: AngularFireDatabase, ds: DataService) {
        this.volunteers = ds.getVolunteers();
        this.volunteerList = this.volunteers.valueChanges().pipe(map( map => {
            let list = Object.keys(map);
            list = list.filter(x => x != '$key' && x != '$exists');
            return list;
        }));

    }


    set(volunteerId, state) {
        event.preventDefault();
        if(volunteerId) {
            let v = {};
            v[volunteerId] = state;
            this.volunteers.update(v);
        }
        this.id = '';
    }
}
