import {Component} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {VirtualList} from 'angular2-virtual-list/angular2-virtual-list';

@Component({
    selector: 'my-app',
    template: `<virtual-list [items]="dataProvider"></virtual-list>`,
    directives: [VirtualList]
})
class MyApp {
    dataProvider:Array<string>;

    constructor() {
        this.dataProvider = [
            'angular2',
            'rocks',
            'baby!'
        ];
    }
}

bootstrap(MyApp);
