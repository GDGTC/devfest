import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YearService } from '../year.service';

@Component({
    template: '<router-outlet>',
})
export class YearSwitcherComponent {
    constructor(route: ActivatedRoute, yearService: YearService) {
        if (route.snapshot.url.length > 0 && route.snapshot.url[0].path.match(/\d{4}/)) {
            yearService.setYear(route.snapshot.url[0].path);
        }
    }
}
