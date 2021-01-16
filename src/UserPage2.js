import { Button, Tab, TextView, Stack, ActivityIndicator, contentView } from 'tabris';
import { ListView, Cell, List } from 'tabris-decorators';
import BasicPage from './BasicPage';

export default class UserPage2 extends BasicPage {

    constructor(url, data, title, desc) {
        super(url, data);

        this.title = title;
        this.desc = desc;
        this.items = new List();
        this._createUI();
        this.onAppear.addListener(() => this._update());
        this.updateDataCallback = this._updateFinish;
    }

    _createUI() {
        this.append(
            new Stack({ spacing: 12, padding: 12, layoutData: "stretch" }).append(
                new TextView({ text: this.desc, left: 0, right: 0 }),
                new TextView({ text: "", height: 20 }),
                new TextView({ id: "elementAmount", text: "Anzahl: ???" }),
                new Button({ centerX: 1, id: 'drawChartButton', text: "Aktualisieren" })
                    .on('select', () => this._update())
            )
        );
    }

    _draw() {
        // keine Aktion
    }

    _update() {
        this.updateData();
    }

    _updateFinish() {
        this.find("#elementAmount").first().text = "Anzahl: " + this.data;
        this._draw();
    }
};