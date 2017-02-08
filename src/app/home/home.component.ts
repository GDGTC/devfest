import { Component } from '@angular/core';

declare var google;

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent {
    makeMapInteractive() {
        new google.maps.Map(document.getElementById('map'), {
            center: {lat: 44.97418, lng:-93.279433 },
            zoom: 16
        });
    }
}