import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, UrlSegment } from '@angular/router';
import { YearSwitcherComponent } from './year-switcher.component';

@NgModule({
    declarations: [YearSwitcherComponent],
    imports: [
        CommonModule,
        RouterModule.forChild([
            // Trying to nest this module so it works similarly if you have a year or not.
            { matcher: isYear, component: YearSwitcherComponent, loadChildren: () => import('./authenticated.module').then(m => m.AuthenticatedModule) },
            { path: 'admin', loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule), data: { title: 'Admin' } },
            { path: 'cfp', loadChildren: () => import('../cfp/cfp.module').then(m => m.CFPModule), data: { title: 'Call For Papers' } },
            { path: '', loadChildren: () => import('../main/main.module').then(m => m.MainModule) },
        ]),
    ],
})
export class AuthenticatedModule {}

export function isYear(url: UrlSegment[]) {
    return url.length >= 1 && url[0].path.match(/\d{4}/) ? { consumed: [url[0]] } : null;
}

