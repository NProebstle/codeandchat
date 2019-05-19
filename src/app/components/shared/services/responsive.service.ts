import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class responsiveService {
    private isMobile = new Subject();
    public screenWidth: string;


    constructor() {
        this.checkWidth();
    }

    onMobileChange(status: boolean) {
        this.isMobile.next(status);
    }

    getMobileStatus(): Observable<any> {
        return this.isMobile.asObservable();
    }

    public checkWidth() {
        var width = window.innerWidth;
        var height = window.innerHeight;
        var ratio = width/height;
        if (ratio <= 0.6) {
            this.screenWidth = 'sm';
            this.onMobileChange(true);
        } else if (width > 768 && width <= 992) {
            this.screenWidth = 'md';
            this.onMobileChange(false);
        } else {
            this.screenWidth = 'lg';
            this.onMobileChange(false);
        }
    }

}