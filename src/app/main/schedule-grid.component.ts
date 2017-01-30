import { Component, Input } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
    selector: 'schedule-grid',
    templateUrl: 'schedule-grid.component.html',
    
})
export class ScheduleGridComponent {
    @Input() data;
    @Input() forceMobile: boolean;

    constructor(public ds: DataService) {

    }
}