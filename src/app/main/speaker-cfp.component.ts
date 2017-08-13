import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-speaker-cfp',
    template: `
    <section>
        <div class="callout">Speaker Registration</div>
        <p>
        We haven't opened speaker registration yet, please stay tuned!
        </p>
    </section>
  `,
    styles: []
})
export class SpeakerCfpComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
