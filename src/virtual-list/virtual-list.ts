import {Input, Output, OnInit, Component, ElementRef, HostListener, EventEmitter} from 'angular2/core';
import {NgFor, NgStyle} from 'angular2/common';
import {bootstrap} from 'angular2/platform/browser';

@Component({
    selector: 'virtual-list',
    template: `
        <div class="canvas" [ngStyle]="canvasHeight">
            <div class="renderer" *ngFor="#item of visibleProvider" (click)="onSelectItem.emit(item)" [ngStyle]="item.styles" [class.selected]="currentOption.value === item.value">{{ item.label }}</div>
        </div>`,
    styles: [`
        :host {
          width: 200px;
          max-height: 200px;
          overflow-y: auto;
          display: block;
        }

        :host .canvas {
            background-color: #eee;
            position: relative;
        }

        :host div.renderer {
            display: block;
            width: 100%;
            cursor: pointer;
            position: absolute;
            height: 30px;
            line-height: 30px;
        }

        :host div.renderer.selected {
            background-color: #ccc;
        }

        :host div.renderer:hover {
            background-color: #666;
            color: white;
        }

        :host div.renderer span {
            margin-left: 10px;
        }
    `],
    directives: [NgFor, NgStyle]
})
export class VirtualList implements OnInit {
    ref:ElementRef;

    rowHeight:number = 30;
    height:number = 200;
    visibleProvider:Array<any> = [];
    cellsPerPage:number = 0;
    numberOfCells:number = 0;
    canvasHeight:Object = {};

    currentOption:Object = {
        value: null,
        label: null
    };

    @Input() items:Array<any>;

    @Output() onSelectItem:EventEmitter<any> = new EventEmitter();

    constructor(ref:ElementRef) {
        this.ref = ref;
    }

    ngOnInit() {
        this.cellsPerPage = Math.round(this.height / this.rowHeight);
        this.numberOfCells = 3 * this.cellsPerPage;
        this.canvasHeight = {
            height: this.items.length * this.rowHeight + 'px'
        };

        this.updateDisplayList();
    }

    @HostListener('scroll')
    updateDisplayList() {
        var firstCell = Math.max(Math.floor(this.ref.nativeElement.scrollTop / this.rowHeight) - this.cellsPerPage, 0);
        var cellsToCreate = Math.min(firstCell + this.numberOfCells, this.numberOfCells);
        this.visibleProvider = this.items.slice(firstCell, firstCell + cellsToCreate);

        for (var i = 0; i < this.visibleProvider.length; i++) {
            this.visibleProvider[i].styles = {
                'top': ((firstCell + i) * this.rowHeight) + "px"
            }
        }
    };
}
