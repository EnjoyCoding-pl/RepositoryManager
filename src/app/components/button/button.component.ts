import { Component, Input } from '@angular/core';

@Component({
    template: `<button type='submit'>{{text}}</button>`,
    selector: 'app-submit-button',
    styleUrls: ['./button.component.css']
})
export default class ButtonComponent {
    @Input() text: string;
}