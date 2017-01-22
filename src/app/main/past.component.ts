import { Component } from '@angular/core';

@Component({
    template: `
        <section>
            <div class="callout">Visit past DevFestMN content</div>
            <p>This is the 4th year of DevFestMN. Visit the 2016 DevFestMN site by clicking below.</p>
            <md-card style="width:400px;">
                <md-card-header><a href="/a/2016/" style="font-size:24px;">2016 DevFestMN Archive</a></md-card-header>
            </md-card>
        </section>
    `,
})
export class PastComponent {
    constructor() { }

}