import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MdTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'admin-nav',
  template: `
    <md-tab-group  (focusChange)="select($event)">
      <md-tab label="Schedule">
      </md-tab>
      <md-tab label="Speakers">
      </md-tab>
      <md-tab label="Reports">
      </md-tab>

    </md-tab-group>
  `,
})
export class AdminNavComponent {
  constructor(public router: Router) {
  }

  select(event: MdTabChangeEvent) {
    if(event.index == 0) {
      this.router.navigate(['admin']);
    } else if(event.index == 1) {
      this.router.navigate(['admin', 'speakers']);
    } else {
      this.router.navigate(['admin', 'reports']);
    }
    
  }

}
