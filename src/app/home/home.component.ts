import { Component } from '@angular/core';

import { environment } from 'environments/environment';
import { YearService } from '../year.service';
declare var google;

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    environment = environment;

    constructor(yearService: YearService) {
        yearService.reset();
    }
 }
