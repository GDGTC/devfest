import { Component } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { AuthService } from '../shared/auth.service';
import { Event } from './events.component';

@Component({
    templateUrl: 'event-edit.component.html',
})
export class EventEditComponent {
    eventData = of({ name: 'Test Event', id: '32a' });

    constructor(public auth: AuthService) {}

    save(event: Event) {}
    delete(event: Event) {}
}
