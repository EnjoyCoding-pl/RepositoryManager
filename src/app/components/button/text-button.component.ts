import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    template: `<a class="text-button" (click)='onClick($event)'>{{text}}</a>`,
    selector: 'app-text-button',
    styleUrls: ['./text-button.component.css']
})
export default class TextButtonComponent {

    @Output() click = new EventEmitter();
    @Input() text: string;
    @Input() route: any[];
    
    constructor(private router: Router) { }

    onClick(event) {
        event.preventDefault();
        event.stopPropagation();

        if (this.route) {
            this.router.navigate(this.route);
        }
        else {
            this.click.emit(event);
        }
    }
}