import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { UpdateService } from './update.service';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([
            { path: '', pathMatch: 'full', loadChildren: './home/home.module#HomeModule' },
            { path: '2017', pathMatch: 'full', loadChildren: './home/home.module#HomeModule' },
            { path: 'admin', loadChildren: './admin/admin.module#AdminModule', data: { title: 'Admin' } },
            { path: '', loadChildren: './main/main.module#MainModule' },
        ]),
        ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production}),
        MatSnackBarModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        UpdateService,

    ]
})
export class AppModule {
    constructor(us: UpdateService) { }
}
