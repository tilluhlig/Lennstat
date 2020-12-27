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
                new TextView({ text: "Lizenzserver (https)", top:'auto' }),
                new TextInput({ text: this.getLicenseServer(), left:"16", right:"16", top:'auto'}),
                new TextView({ text: "Lizenzschlüssel:", top:'auto' }),
                new TextInput({ text: this.getLicenseKey(), left:"16", right:"16", top:'auto'}),
            )
        );
        this.find(TextInput)[0].onTextChanged.addListener(() => this.licenseServerChanged());
        this.find(TextInput)[1].onTextChanged.addListener(() => this.licenseKeyChanged());
    }

    licenseServerChanged(){
      this.setLicenseServer(contentView.find(TextInput)[0].text);
    }

    licenseKeyChanged(){
      this.setLicenseKey(contentView.find(TextInput)[1].text);
    }
};