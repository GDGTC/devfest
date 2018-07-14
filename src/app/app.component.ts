import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { trigger, transition, state, group, query, style, animate, animateChild } from '@angular/animations';
import { environment } from 'environments/environment';

import { filter } from 'rxjs/operators';
import { OurMeta } from './our-meta.service';

declare var ga: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('routeAnimation', [
            transition('1 =>2', [
                style({ height: '!' }),
                query(':enter', style({ transform: 'translateX(100%)' })),
                query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
                // animate the leave page away
                group([
                    query(':leave', [
                        animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
                    ]),
                    // and now reveal the enter
                    query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
                ]),
            ]),
            transition('2 => 1', [
                style({ height: '!' }),
                query(':enter', style({ transform: 'translateX(-100%)' })),
                query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
                // animate the leave page away
                group([
                    query(':leave', [
                        animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
                    ]),
                    // and now reveal the enter
                    query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
                ]),
            ]),
        ]),
    ],
})
export class AppComponent {
    environment = environment;

    constructor(router: Router, meta: OurMeta) {
        router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((n: NavigationEnd) => {
            let pageTitle = this.getDeepestTitle(router.routerState.snapshot.root);
            if (pageTitle && pageTitle !== true) {
                meta.setTitle(pageTitle);
            } else if (pageTitle !== false) {
                meta.clearTitle();
            }

            meta.clearCanonical();

            window.scrollTo(0, 0);

            ga('send', 'pageview', n.urlAfterRedirects);
        });
        router.events.pipe(filter(e => e instanceof NavigationStart)).subscribe((n: NavigationStart) => {
        });
    }

    prepRouteState(outlet: any) {
        return outlet.activatedRouteData['depth'] || '0';
    }

    getDeepestTitle(snapshot): string | boolean {
        let child = snapshot.children[0];
        let result;
        if (child) {
            result = this.getDeepestTitle(child);
        } else if (snapshot.data['title']) {
            result = snapshot.data['title'];
        } else {
            result = false;
        }
        return result;
    }
}
