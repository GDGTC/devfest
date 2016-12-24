import { Component, Input } from '@angular/core';
@Component({
  selector: 'admin-nav',
  template: `
    <div class='admin-nav-container'>
		<a routerLink="/admin">Admin</a>
		<a routerLink="/admin/speakers">speakers</a>
		<a routerLink="/admin/schedule">schedule</a>
    </div>
  `
})
export class AdminNavComponent {
}
