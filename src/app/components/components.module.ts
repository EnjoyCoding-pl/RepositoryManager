import { NgModule } from '@angular/core';
import ButtonComponent from './button/button.component';
import InputComponent from './input/input.component';
import AlertComponent from './alert/alert.component';
import { CommonModule } from '@angular/common';
import TextButtonComponent from './button/text-button.component';

@NgModule({
    imports:[CommonModule],
    declarations: [ButtonComponent, InputComponent, AlertComponent, TextButtonComponent],
    exports: [ButtonComponent, InputComponent, AlertComponent, TextButtonComponent],
})
export default class ComponentModule { }