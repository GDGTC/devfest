import { Injectable } from '@angular/core';

@Injectable()
export class YearService {
    year = new Date().getFullYear();
    setYear(year: number) {
        this.year = year;
    }
}
