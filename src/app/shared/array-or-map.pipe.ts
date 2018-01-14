import { Pipe, PipeTransform } from '@angular/core';

/**
 * Take an object map or array and return just an array of items
 *
 */
@Pipe({ name: 'arrayOrMap' })
export class ArrayOrMapPipe implements PipeTransform {
    constructor() {}

    transform(value: { [key: string]: any } | any[]): any {
        if (!value) {
            return value;
        }
        return Object.keys(value).map(key => {
            return {
                key: key,
                value: value[key],
            };
        });
    }
}
