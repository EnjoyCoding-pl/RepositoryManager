import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import AlertService from 'src/app/core/services/alert.service';
import { Router, NavigationStart } from '@angular/router';
import Alert from 'src/app/core/models/alert.model';
import { AlertType } from "src/app/core/models/alert-type.enum";


@Component({
    template: `
    <div *ngFor='let alert of alerts' (click)='onClickAlert(alert)' class='{{cssClass(alert)}}'>
        <span>{{alert.message}}</span>
    </div>`,
    selector: 'app-alert',
    styleUrls: ['./alert.component.css']
})
export default class AlertComponent implements OnInit, OnDestroy {

    private alertSubscription: Subscription;
    private routeSubscription: Subscription;

    alerts: Alert[] = [];

    constructor(private alertService: AlertService, private router: Router) { }

    ngOnInit(): void {
        this.alertSubscription = this.alertService.onAlert().subscribe(alert => {
            if (!alert.message) {
                this.alerts = [];
            } else {
                this.alerts.push(alert);
            }
        });

        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear();
            }
        })
    }

    onClickAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = ['alert-container'];

        const alertTypeClass = {
            [AlertType.SUCCESS]: 'alert-success',
            [AlertType.ERROR]: 'alert-error'
        };
        classes.push(alertTypeClass[alert.type]);

        return classes.join(' ');
    }

    ngOnDestroy(): void {
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }
}