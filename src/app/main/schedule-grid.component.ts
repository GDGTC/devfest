import { Component, Input } from '@angular/core';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'schedule-grid',
    templateUrl: 'schedule-grid.component.html',

})
export class ScheduleGridComponent {
    @Input() data;
    @Input() forceMobile: boolean;
    @Input() year;

    constructor(public ds: DataService, public auth: AuthService) {

    }
}
