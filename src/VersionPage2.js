import { Button, Canvas, CheckBox, Composite, Page, device, Tab, TextView, Stack } from 'tabris';
import { ListView, Cell, List } from 'tabris-decorators';
import ChartPage from './ChartPage';

export default class VersionPage2 extends ChartPage {

    constructor(type, url, data, title, desc) {
        super(type, url, data, title, desc);
        this.updateDataCallback = this._updateFinish;
        this.items = null;
    }

    _update() {
        this.items = null;
        this.updateData();
    }

    _updateFinish() {
        this.items = [];
        let colors = ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"];

        var sortedItemKeys = this.getSortedKeys(this.data);
        let max = this.sumElements(Object.values(this.data));

        for (var i in sortedItemKeys) {
            var key = sortedItemKeys[i];
            var elem = {
                "value": parseInt(this.data[key]),
                "color": colors[i % colors.length],
                "highlight": "#FF5A5E",
                "label": key
            }

            var percentValue = Math.round(this.data[key]/max*100);
            if (percentValue!=0){
                this.items.push(elem);
            }
        }
        this.drawChart(0);
    }
};