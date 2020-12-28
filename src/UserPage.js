import { Button, Canvas, CheckBox, Composite, Page, device, Tab, TextView, Stack } from 'tabris';
import { ListView, Cell, List } from 'tabris-decorators';
import ChartPage from './ChartPage';

export default class UserPage extends ChartPage {

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
        this.items = {
            "labels": [],
            "datasets": []
        };

        var res = [];
        this.items.labels = [];

        var res = {
            "label": "",
            "fillColor": "rgba(151,187,205,0.2)",
            "strokeColor": "rgba(151,187,205,1)",
            "pointColor": "rgba(151,187,205,1)",
            "pointStrokeColor": "#fff",
            "pointHighlightFill": "#fff",
            "pointHighlightStroke": "rgba(151,187,205,1)",
            "data": []
        };

        var max = 0;
        for (var key in this.data) {
            this.items.labels.push("");
            var value = parseInt(this.data[key]);
            res["data"].push(value);
            max = Math.max(max, value);
        }
        this.items.datasets = [res];
        this.drawChart(max);
    }
};