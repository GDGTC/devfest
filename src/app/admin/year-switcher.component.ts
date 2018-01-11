import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { YearService } from 'app/year.service';

@Component({
    template: '<router-outlet>',
})
export class YearSwitcherComponent {
    constructor(route: ActivatedRoute, yearService: YearService) {
        if (route.snapshot.url.length > 1 && route.snapshot.url[1].path.match(/\d{4}/)) {
            yearService.setYear(parseInt(route.snapshot.url[1].path, 10));
        }
    }
}
