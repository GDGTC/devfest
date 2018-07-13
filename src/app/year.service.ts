import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable()
export class YearService {
    year: number;
    constructor() {
        this.reset();
    }
    setYear(year: number) {
        this.year = year;
    }
    reset() {
        this.year = new Date().getFullYear();
    }
}
