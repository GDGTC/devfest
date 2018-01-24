import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, UrlSegment } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { UpdateService } from './update.service';
import { YearSwitcherComponent } from './year-switcher.component';
import { YearService } from './year.service';
import { OurMeta } from 'app/our-meta.service';

@NgModule({
    declarations: [
        AppComponent,
        YearSwitcherComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', loadChildren: './home/home.module#HomeModule' },
            { matcher: isMarketingContent, loadChildren: './content/content.module#ContentModule' },
            { matcher: isYear , component: YearSwitcherComponent, loadChildren: './main/main.module#MainModule'},
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule', data: { title: 'Admin' } },
            { path: '', component: YearSwitcherComponent, loadChildren: './main/main.module#MainModule'},

        ]),
        ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
        MatSnackBarModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        UpdateService,
        YearService,
        OurMeta,
    ]
})
export class AppModule {
    constructor(us: UpdateService) { }
}


export function isMarketingContent(url: UrlSegment[]) {
    let result = (url.length === 1 && url[0].path.match(/(tickets|sponsors|past|speaker-cfp)/)) ? ({consumed:[]}) : null;
    return result;
}
export function isYear(url: UrlSegment[]) {
    return url.length >= 1 && url[0].path.match(/\d{4}/) ? ({consumed:[url[0]]}) : null;
}
