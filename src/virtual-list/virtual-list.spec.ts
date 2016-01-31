import {it, describe, expect, beforeEach, inject} from 'angular2/testing';
import {ElementRef} from "angular2/core";
import {VirtualList} from "./virtual-list";

describe('Virtual List', () => {
    let list:VirtualList;
    let ref:ElementRef;

    beforeEach(() => {
        ref = {
            nativeElement: {
                scrollTop: 1500,
                clientHeight: 200
            }
        };

        list = new VirtualList(ref);

        list.items = [];

        for (var i=0; i<300; i++) {
            list.items.push({
                label: 'item ' + i,
                value: i
            });
        }
    });

    it('Should initialize the list', () => {
        spyOn(list, 'updateDisplayList').and.callFake(() => {});

        list.ngOnInit();

        expect(list.cellsPerPage).toBe(7);
        expect(list.numberOfCells).toBe(21);
        expect(list.canvasHeight).toEqual({
            height: '9000px'
        });
        expect(list.updateDisplayList).toHaveBeenCalled();
    });

    it('Should update the list on scroll', () => {
        spyOn(list.items, 'slice').and.callThrough();

        list.cellsPerPage = 7;
        list.numberOfCells = 20;
        list.canvasHeight = {
            height: '9000px'
        };

        list.updateDisplayList();

        expect(list.items.slice).toHaveBeenCalledWith(43, 63);
        expect(list.visibleProvider.length).toBe(20);
        expect(list.visibleProvider[0].styles).toEqual({
            'top':  '1290px',
            'height': '30px',
            'line-height': '30px'
        });
    });
});
