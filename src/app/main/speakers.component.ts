import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { YearService } from 'app/year.service';
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
        this.speakers = ds.getSpeakers();
    }

    addSpeaker() {
        this.router.navigate(['/admin', this.yearService.year, 'speakers', 'new', 'edit']);
    }
}
