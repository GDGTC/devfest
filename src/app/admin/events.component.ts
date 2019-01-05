import { Component } from '@angular/core';
import { of as observableOf } from 'rxjs';

@Component({
    templateUrl: 'events.component.html',
})
export class EventsComponent {
    events = observableOf([]);
}
