import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Alert from '../models/alert.model';
import { AlertType } from "../models/alert-type.enum";
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export default class AlertService {

    private alertSubject: Subject<Alert> = new Subject<Alert>();
    private defaultId: string = "default-alert";

    onAlert(id = this.defaultId) {
        return this.alertSubject.asObservable().pipe(filter(x => x && x.id === id));
    }
    
    success(message: string, id = this.defaultId) {
        this.alert(new Alert({
            id: id,
            message: message,
            type: AlertType.SUCCESS
        }))
    }
    
    error(message: string, id = this.defaultId) {
        this.alert(new Alert({
            id: id,
            message: message,
            type: AlertType.ERROR
        }));
    }
    
    alert(alertMessage: Alert) {
        alertMessage.id = alertMessage.id || this.defaultId;
        this.alertSubject.next(alertMessage);
    }

    clear(id = this.defaultId) {
        this.alertSubject.next(new Alert({ id }));
    }
}