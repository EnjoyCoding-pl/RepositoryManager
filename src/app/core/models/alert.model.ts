import { AlertType } from './alert-type.enum';

export default class Alert {
    id: string;
    message: string;
    type: AlertType;
    constructor(init: Partial<Alert>) {
        Object.assign(this, init);
    }
}