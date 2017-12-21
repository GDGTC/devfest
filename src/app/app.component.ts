import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, transition, state, group, query, style, animate, animateChild } from '@angular/animations';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/filter';

declare var ga: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    animations: [
        trigger('routeAnimation', [
            transition('1 =>2', [
                style({ height: "!"}),
                query(':enter', style({ transform: 'translateX(100%)' })),
                query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
                // animate the leave page away
                group([
                    query(':leave', [
                        animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(-100%)' })),
                    ]),
                    // and now reveal the enter
                    query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
                ])
            ]),
            transition('2 => 1', [
                style({ height: "!"}),
                query(':enter', style({ transform: 'translateX(-100%)' })),
                query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0 })),
                // animate the leave page away
                group([
                    query(':leave', [
                        animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(100%)' })),
                    ]),
                    // and now reveal the enter
                    query(':enter', animate('0.3s cubic-bezier(.35,0,.25,1)', style({ transform: 'translateX(0)' }))),
                ])
            ]),
        ])
    ]
})
export class AppComponent {
    environment = environment;

    constructor(router: Router, title: Title) {
        router.events.filter(e => e instanceof NavigationEnd).subscribe((n: NavigationEnd) => {
            let pageTitle = router.routerState.snapshot.root.children[0].data['title'];
            if (pageTitle) {
                title.setTitle(pageTitle + ' | DevFestMN');
            } else if (pageTitle !== false) {
                title.setTitle('DevFestMN');
            }
            window.scrollTo(0, 0);
            ga('send', 'pageview', n.urlAfterRedirects);
        });
    }

    prepRouteState(outlet: any) {
        return outlet.activatedRouteData['depth'] || '0';


    }
}
