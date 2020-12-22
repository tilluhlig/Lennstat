import { Button, Tab, TextView, Stack, ActivityIndicator, contentView, TextInput } from 'tabris';
import { ListView, Cell, List } from 'tabris-decorators';
import BasicPage from './BasicPage';

export default class SettingsPage extends BasicPage {

    constructor(url, data, title, desc) {
        super(url, data);

        this.title = title;
        this.desc = desc;
        this._createUI();
        this.masterElem = null;
    }

    _createUI() {
        this.append(
            new Stack({ spacing: 12, padding: 12, layoutData: "stretch" }).append(
                new TextView({ layoutData: "center", text: "Lizenzserver", top:'prev() 48' }),
                new TextInput({ layoutData: "center", text: this.getLicenseServer(), left:"16", right:"16", top:'prev() 12'}),
            )
        );
        this.find(TextInput).first().onTextChanged.addListener(() => this.licenseServerChanged());
    }

    licenseServerChanged(){
      this.setLicenseServer(contentView.find(TextInput).first().text);
    }
};