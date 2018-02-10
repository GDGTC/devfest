import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { switchMap } from 'rxjs/operators';
import { DataService, Speaker } from '../shared/data.service';
import { YearService } from 'app/year.service';

@Component({
    templateUrl: './speaker-edit.component.html',
})
export class SpeakerEditComponent {
    speakerData: Observable<Speaker>;

    constructor(public ds: DataService, public route: ActivatedRoute, public router: Router, public yearService: YearService) {
        this.speakerData = route.params.pipe(switchMap(params => {
            if (params['id'] === 'new') {
                return Observable.of({});
            }
            return ds.getSpeakers().map(list => list.find(item => item.$key === params['id']));
        }));
    }

    save(speaker) {
        console.log('Saving speaker', speaker);
        event.preventDefault();
        this.ds.save('speakers', speaker);
        console.log('rerouting to', this.yearService.year);
        this.router.navigate(['/', this.yearService.year, 'speakers']);
    }

    delete(speaker) {
        if (confirm('Are you sure you want to delete this speaker?')) {
            this.ds.delete('speakers', speaker);
            this.router.navigate(['/', this.yearService.year, 'speakers']);
        }
    }
}
