import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Alert from '../models/alert.model';
import { AlertType } from "../models/alert-type.enum";

const ALERT_ID = "DEFAULT";

@Injectable({ providedIn: 'root' })
export default class AlertService {

    private alertSubject: Subject<Alert> = new Subject<Alert>();

    onAlert() {
        return this.alertSubject.asObservable();
    }

    success(message: string) {
        this.alert(new Alert({
            id: ALERT_ID,
            message: message,
            type: AlertType.SUCCESS
        }))
    }

    error(message: string) {
        this.alert(new Alert({
            id: ALERT_ID,
            message: message,
            type: AlertType.ERROR
        }));
    }

    alert(alertMessage: Alert) {
        this.alertSubject.next(alertMessage);
    }

    clear() {
        this.alertSubject.next(new Alert({ id: ALERT_ID }));
    }
}