import { Component } from '@angular/core';

import { environment } from '../../environments/environment';
declare var google;

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    environment = environment;
 }
