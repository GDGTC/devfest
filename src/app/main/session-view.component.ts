import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import * as Showdown from 'showdown';

import { DataService, Session } from '../shared/data.service';
import { YearService } from 'app/year.service';
import { DomSanitizer } from '@angular/platform-browser';
import { OurMeta } from 'app/our-meta.service';

@Component({
    templateUrl: './session-view.component.html',
})
export class SessionViewComponent {
    session: Observable<Session>;

    constructor(
        route: ActivatedRoute,
        ds: DataService,
        meta: OurMeta,
        public yearService: YearService,
        sanitizer: DomSanitizer
    ) {
        this.session = route.params.pipe(
            switchMap(params =>
                ds.getSchedule().pipe(
                    map(list => list.find(item => item.$key === params['id'])),
                    map(item => {
                        if (!item) {
                            return {};
                        }
                        let converter = new Showdown.Converter({ extensions: [] });
                        converter.setOption('noHeaderId', 'true');
                        item.renderedDescription = sanitizer.bypassSecurityTrustHtml(
                            converter.makeHtml(item.description || '')
                        );
                        return item;
                    })
                )
            )
        );

        this.session.subscribe(sessionData => {
            if (sessionData) {
                console.log('setting session view metadata');
                meta.setTitle(sessionData.title);
            }
        });
    }
}
