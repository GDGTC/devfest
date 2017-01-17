import { Component } from '@angular/core';

@Component({
    template: `
        <div style="height:200px;"></div>
        <section>
            <h2>Visit past DevFestMN content</h2>
            <ol style="min-height:70vh;">
                <li><a href="/a/2016/">2016</a></li>
            </ol>
            
        </section>
    `,
})
export class PastComponent {
    constructor() { }

}