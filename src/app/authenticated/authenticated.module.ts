import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, UrlSegment } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { YearSwitcherComponent } from './year-switcher.component';
import { environment } from 'environments/environment';

@NgModule({
    declarations: [YearSwitcherComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            // Trying to nest this module so it works similarly if you have a year or not.
            { matcher: isYear, component: YearSwitcherComponent, loadChildren: './authenticated.module#AuthenticatedModule' },
            { path: 'admin', loadChildren: '../admin/admin.module#AdminModule', data: { title: 'Admin' } },
            { path: 'cfp', loadChildren: '../cfp/cfp.module#CFPModule', data: { title: 'Call For Papers' } },
            { path: '', loadChildren: '../main/main.module#MainModule' },
        ]),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
    ],
})
export class AuthenticatedModule {}

export function isYear(url: UrlSegment[]) {
    return url.length >= 1 && url[0].path.match(/\d{4}/) ? { consumed: [url[0]] } : null;
}

