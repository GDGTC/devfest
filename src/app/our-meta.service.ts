import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class OurMeta {
    constructor(public title: Title, public meta: Meta) {}

    setTitle(title: string) {
        this.title.setTitle(`${title} | ${environment.siteName}`);
    }
    clearTitle() {
        this.title.setTitle(environment.siteName);
    }

    clearCanonical() {
        const existing = document.querySelector('link[rel="canonical"]');
        const head = document.querySelector('head');

        if (existing) {
            head.removeChild(existing);
        }
    }
    setCanonical(path: string) {
        this.clearCanonical();

        const head = document.querySelector('head');

        let canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = `/${path}`;

        head.appendChild(canonical);
    }
}
