import { Button, Tab, TextView, Stack, ActivityIndicator, contentView, TextInput, Composite, fs } from 'tabris';
import { ListView, Cell, List } from 'tabris-decorators';
import BasicPage from './BasicPage';
var privacyData = "";


export default class SettingsPage extends BasicPage {

    constructor(url, data, title, desc) {
        super(url, data);

        this.title = title;
        this.desc = desc;
        this._createUI();
        this.masterElem = null;
    }

    async readPrivacy() {
        privacyData = await fetch(__dirname + "/privacy.md");
        privacyData = await privacyData.text();
        this.find("#privacyElem").first().text = privacyData;
    }

    _createUI() {
        this.append(
            new Stack({ spacing: 12, padding: 12, layoutData: "stretch" }).append(
                new TextView({ text: "Lizenzserver (https):", top: 'auto' }),
                new TextInput({ text: this.getLicenseServer(), left: "16", right: "16", top: 'auto' }),
                new TextView({ text: "Lizenzschlüssel:", top: 'auto' }),
                new TextInput({ text: this.getLicenseKey(), left: "16", right: "16", top: 'auto' }),
                new TextView({ text: "", top: 'auto', height: 50 }),
                new TextView({ id: "privacyElem", left: 0, right: 0, text: privacyData, top: 'auto', markupEnabled: true }),
            )
        );
        this.find(TextInput)[0].onTextChanged.addListener(() => this.licenseServerChanged());
        this.find(TextInput)[1].onTextChanged.addListener(() => this.licenseKeyChanged());
        this.readPrivacy();
    }

    licenseServerChanged() {
        this.setLicenseServer(contentView.find(TextInput)[0].text);
    }

    licenseKeyChanged() {
        this.setLicenseKey(contentView.find(TextInput)[1].text);
    }
};