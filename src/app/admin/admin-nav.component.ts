import { Component, Input } from '@angular/core';
@Component({
  selector: 'admin-nav',
  template: `
    <div class='admin-nav-container'>
		<button md-raised-button routerLink="/admin">Admin</button>
		<button md-raised-button routerLink="/admin/speakers">speakers</button>
		<button md-raised-button routerLink="/admin/schedule">schedule</button>
    </div>
  `,
  styles: [`.admin-nav-container {
        position: fixed;
    background: white;
    top: 4px;
  }   `],
})
export class AdminNavComponent {
}
