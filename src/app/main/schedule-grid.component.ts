import { Component, Input } from '@angular/core';
import { DataService } from '../shared/data.service';
import { AuthService } from '../shared/auth.service';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'schedule-grid',
    templateUrl: 'schedule-grid.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleGridComponent {
    @Input() data;
    @Input() forceMobile: boolean;
    @Input() year;

    constructor(public ds: DataService, public auth: AuthService) {

    }
}
