import { Button, Tab, TextView, Stack, ActivityIndicator, contentView } from 'tabris';
import { ListView, Cell, List } from 'tabris-decorators';
import BasicPage from './BasicPage';

export default class VersionPage extends BasicPage {

    constructor(url, data, title, desc) {
        super(url, data);

        this.title = title;
        this.desc = desc;
        this.items = new List();
        this._createUI();
        this.masterElem = this.find(ListView).first();
        this.onAppear.addListener(() => this._update());
        this.updateDataCallback = this._updateFinish;
    }

    _createUI() {
        this.append(
            new Stack({ spacing: 12, padding: 12, layoutData: "stretch" }).append(
                new TextView({ text: this.desc, left: 0, right: 0 }),
                new TextView({ text: "", height: 20 }),
                new TextView({ id: "elementAmount", text: "Anzahl: ???" }),
                new TextView({ text: "", height: 20 }),
                new ListView({ layoutData: "stretch", items: this.items, left: 0, right: 0 }).append(
                    new Cell({ padding: 8, height: 52 }).append(
                        <TextView centerY bind-text='item' font='24px' />
                    )
                ),
                new Button({ centerX: 1, id: 'drawChartButton', text: "Aktualisieren" })
                    .on('select', () => this._update())
            )
        );
    }

    _draw() {
        // keine Aktion
    }

    _update() {
        this.clearList(this.items);
        this.updateData();
    }

    _updateFinish() {
        this.data = Object.keys(this.data)
        this.data = this.data.reverse();

        this.find(ListView).first().items = this.data;
        this.find("#elementAmount").first().text = "Anzahl: " + this.data.length;
        this._draw();
    }
};