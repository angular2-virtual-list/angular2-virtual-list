import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {VirtualList} from 'angular2-virtual-list/angular2-virtual-list';

@Component({
    selector: 'my-app',
    template: `
        <virtual-list [items]="dataProvider" (onSelectItem)="onSelectItem($event)"></virtual-list>
        <span>item #{{item?.value}} selected!</span>
        `,
    directives: [VirtualList]
})
class MyApp {
    dataProvider:Array<any> = [];
    item:Object;

    constructor() {
        for (var i=0; i<1000000; i++) {
            this.dataProvider.push({
                label: 'item #' + i, value: i
            });
        }
    }

    onSelectItem($event) {
        this.item = $event;
    }
}

bootstrap(MyApp);
