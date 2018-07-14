import { Injectable } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material';

@Injectable({providedIn: 'root'})
export class UpdateService {
    constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {
        this.swUpdate.available.subscribe(evt => {
            const snack = this.snackbar.open('Update Available', 'Reload');

          snack
            .onAction()
            .subscribe(() => {
              window.location.reload();
            });
        });
      }
}
