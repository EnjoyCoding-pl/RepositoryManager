import { Component, Input, ViewChild, ElementRef, forwardRef } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    template: `
    <fieldset>
        <legend>{{label}}</legend>
        <input [type]='type' [placeholder]='placeholder'
        [value]='data'
        (input)="onChange($event.target.value)" 
        (blur)="onTouched()"
        [disabled]="disabled"/>
    </fieldset>`,
    selector: 'app-form-input',
    styleUrls: ['./input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        multi: true,
        useExisting: forwardRef(() => InputComponent)
    }]
})
export default class InputComponent implements ControlValueAccessor {
    
    @Input() type: 'text' | 'password';
    @Input() placeholder: string;
    @Input() label: string;

    disabled: boolean;
    data: string;

    writeValue(obj: any): void {
        this.data = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    
    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onChange(event) { }

    onTouched() { }
}