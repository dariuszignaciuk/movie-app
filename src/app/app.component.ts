import {Component, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public isLoading: boolean;

    constructor(private router: Router) {
    }

    ngOnInit(): void {
        this.router.events.subscribe((routerEvent: RouterEvent) => {
            this.checkRouterEvent(routerEvent);
        });
    }

    private checkRouterEvent(routerEvent: RouterEvent): void {
        if (routerEvent instanceof NavigationStart) {
            this.isLoading = true;
        } else if (routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel
            || routerEvent instanceof NavigationEnd) {
            setTimeout(() => {
                this.isLoading = false;
            });
        }
    }
}
