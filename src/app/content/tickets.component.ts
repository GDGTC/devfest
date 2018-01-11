import { Component } from '@angular/core';
import { environment } from '../../environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    template: `
    <iframe [src]="url" frameborder="0"
    height="1000"
    width="100%"
    vspace="0"
    hspace="0" marginheight="5" marginwidth="5" scrolling="auto" allowtransparency="true"></iframe>
    `,
})
export class TicketsComponent  {
    url;

    constructor(sanitizer: DomSanitizer) {
        this.url = sanitizer.bypassSecurityTrustResourceUrl(environment.showRegister);
    }
}
