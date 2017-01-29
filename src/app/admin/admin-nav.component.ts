import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MdTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'admin-nav',
  template: `
    <md-tab-group  (focusChange)="select($event)">
      <md-tab label="Sessions">
      </md-tab>
      <md-tab label="Speakers">
      </md-tab>

    </md-tab-group>
  `,
})
export class AdminNavComponent {
  constructor(public router: Router) {
  }

  select(event: MdTabChangeEvent) {
    let destination = event.index == 0 ? 'schedule' : 'speakers';
    this.router.navigate(['admin',destination]);
  }

}
