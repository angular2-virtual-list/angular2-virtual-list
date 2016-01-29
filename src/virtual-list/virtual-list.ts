import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';

@Component({
    selector: 'virtual-list',
    template: `<div *ngFor="#item of items">{{ item }}</div>`,
    directives: [NgFor],
    inputs: ['items']
})
export class VirtualList {
    items:Array<string>;

    constructor() {

    }
}
