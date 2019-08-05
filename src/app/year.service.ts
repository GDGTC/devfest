import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({providedIn: 'root'})
export class YearService {
    year: string;
    constructor() {
        this.reset();
    }
    setYear(year: string) {
        this.year = year;
    }
    reset() {
        this.year = environment.defaultYear;
    }
}
