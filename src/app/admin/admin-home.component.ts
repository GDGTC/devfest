import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-admin-home',
  template: `
  <div *ngIf="auth.isAdmin | async; else notadmin"><p></p>
    <p style="margin:16px 0;">
      Welcome to the administrator portal.</p>
      <p>Schedule and session data is now managed from their main pages.
    </p>
    </div>
    <ng-template #notadmin>
    You aren't an administrator or voulnteer, so you can't access this section, sorry!
    </ng-template>
  `,
  styles: []
})
export class AdminHomeComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
