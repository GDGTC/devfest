import { startWith, tap, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Stores every emitted value in localStorage,
 * starts with the stored value if one exists,
 * and shares the replay of all of this
 *
 * @param cacheKey Key used in localStorage
 */
export const localstorageCache = (cacheKey: string) => <T>(source: Observable<T>) => {
    let cachedValue: T = null;
    try {
        cachedValue = JSON.parse(localStorage[cacheKey]);
    } catch (parseException) {}
    let result = source.pipe(tap(next => (localStorage[cacheKey] = JSON.stringify(next))));
    if (cachedValue) {
        result = result.pipe(startWith(<T>JSON.parse(localStorage[cacheKey])));
    }
    return result.pipe(shareReplay(1));
};
