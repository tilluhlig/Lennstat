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
                new TextView({ layoutData: "center", text: this.desc }),
                new ListView({ layoutData: "stretch", items: this.items }).append(
                    new Cell({ padding: 8, height: 52 }).append(
                        <TextView centerY bind-text='item' font='24px' />
                    )
                ),
                new Button({ layoutData: "center", id: 'drawChartButton', text: "Aktualisieren" })
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

    _updateFinish(){
        this.find(ListView).first().items = this.data;
        this._draw();
    }
};