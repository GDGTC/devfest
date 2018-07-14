import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, UrlSegment } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'environments/environment';
import { AppComponent } from './app.component';
import { UpdateService } from './update.service';
import { MatSnackBarModule } from '@angular/material';


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', loadChildren: './home/home.module#HomeModule' },
            { matcher: isMarketingContent, loadChildren: './content/content.module#ContentModule' },
            { path: '', loadChildren: './authenticated/authenticated.module#AuthenticatedModule' },
        ]),
        ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
        MatSnackBarModule,

    ],
    bootstrap: [AppComponent],
    providers: [],
})
export class AppModule {
    constructor(us: UpdateService) {}
}

export function isMarketingContent(url: UrlSegment[]) {
    let result = url.length === 1 && url[0].path.match(/(tickets|sponsors|past|speaker-cfp)/) ? { consumed: [] } : null;
    return result;
}
