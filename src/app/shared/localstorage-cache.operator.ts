import { startWith, tap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const localstorageCache = (cacheKey: string) => <T>(source: Observable<T>) =>
    source.pipe(
        tap(next => (localStorage[cacheKey] = JSON.stringify(next))),
        startWith(JSON.parse(localStorage[cacheKey] || undefined)),
        shareReplay(1)
    );
