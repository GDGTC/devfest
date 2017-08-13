import { Component } from '@angular/core';

@Component({
    template: `
        <section>
            <div class="callout">Visit past DevFestMN content</div>
            <p>This is the 5th year of DevFestMN.</p>
            <md-card style="width:400px;margin:16px 0;">
                <md-card-header><a href="/2017/speakers" style="font-size:24px;">2017 DevFestMN Speakers</a></md-card-header>
            </md-card>
            <md-card style="width:400px;margin:16px 0;">
                <md-card-header><a href="/2017/schedule" style="font-size:24px;">2017 DevFestMN Schedule</a></md-card-header>
            </md-card>
            <md-card style="width:400px;margin:16px 0;">
                <md-card-header><a href="/a/2016/" style="font-size:24px;">2016 DevFestMN Archive</a></md-card-header>
            </md-card>
        </section>
    `,
})
export class PastComponent {
    constructor() { }

}
