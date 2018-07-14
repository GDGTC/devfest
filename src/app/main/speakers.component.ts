import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { YearService } from '../year.service';
import { AuthService } from '../shared/auth.service';
import { DataService } from '../shared/data.service';

@Component({
    templateUrl: './speakers.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpeakersComponent {
    speakers;

    thisSpeaker = {};
    showDialog = false;

    year: string;

    constructor(
        public ds: DataService,
        public router: Router,
        public auth: AuthService,
        public yearService: YearService
    ) {
        this.speakers = ds.getSpeakers(yearService.year);
    }

    addSpeaker() {
        this.router.navigate(['/',this.yearService.year,'admin', 'speakers', 'new', 'edit']);
    }
}
