import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'admin-nav',
  template: `
    <mat-tab-group  (focusChange)="select($event)">
      <mat-tab label="Feedback">
      </mat-tab>
      <mat-tab label="Volunteers">
      </mat-tab>

    </mat-tab-group>
  `,
})
export class AdminNavComponent {
  constructor(public router: Router) {
  }

  select(event: MatTabChangeEvent) {
    if(event.index === 0) {
      this.router.navigate(['admin', 'reports']);
    } else if(event.index === 1) {
        this.router.navigate(['admin', 'volunteers']);
    } else {
    }

  }

}
