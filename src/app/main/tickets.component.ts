import { Component } from '@angular/core';

@Component({
    template: `
    <iframe src="https://www.eventbrite.com/e/devfestmn-2017-a-google-developer-group-twin-cities-event-tickets-28756035075?ref=eweb" frameborder="0" 
    height="1000" 
    width="100%" 
    vspace="0" 
    hspace="0" marginheight="5" marginwidth="5" scrolling="auto" allowtransparency="true"></iframe>
    `,
})
export class TicketsComponent  {
    constructor() { }
}