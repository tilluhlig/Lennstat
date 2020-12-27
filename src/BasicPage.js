import { Button, Canvas, CheckBox, Composite, Page, device, Tab, TextView, Stack, ActivityIndicator, contentView } from 'tabris';

export default class BasicPage extends Tab {

    constructor(url, data) {
        super();
        this.errorView = null;
        this.progressIndicator = null;
        this.url = url;
        this.data = data;
        this.masterElem = null;
        this.updateDataCallback = null;
        this.LICENSE_KEY = 'licenseServer';
    }

    showErrorView(text) {
        this.errorView = new TextView({
            centerY: true,
            centerX: true,
            text,
            markupEnabled: true
        }).appendTo(this);
    }

    hideErrorView() {
        // alte Fehlermeldungen entfernen
        if (this.errorView !== null) {
            this.errorView.dispose();
        }
    }

    clearList(list) {
        let anz = list.length;
        var i;
        for (i = 0; i < anz; i++) {
            list.pop();
        }
    }

    showProgressIndicator() {
        this.progressIndicator = new ActivityIndicator({
            centerX: 0, centerY: 0
        }).appendTo(contentView.find(Tab)[1]);
    }

    hideProgressIndicator() {
        if (this.progressIndicator !== null) {
            this.progressIndicator.dispose();
        }
    }

    getLicenseServer() {
        let server = localStorage.getItem(this.LICENSE_KEY) || 'http://server.xyz';
        return server;
    }

    setLicenseServer(text) {
        localStorage.setItem(this.LICENSE_KEY, text);
    }

    updateData() {
        // Create loading indicator
        this.showProgressIndicator();
        this.hideErrorView();

        if (this.masterElem !== null) {
            this.masterElem.visible = true;
        }

        this.data = null;

        // Run async remote request with fetch
        let fullUrl = this.getLicenseServer() + "/" + this.url;
        //console.log(fullUrl);

        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === xhr.DONE) {
                //console.log("done");

                this.data = JSON.parse(xhr.responseText).content
                if (this.updateDataCallback !== null) {
                    this.updateDataCallback();
                }
                this.hideProgressIndicator();
            }
        };

        xhr.onerror = (err) => {
            //console.log("error");
            this.showErrorView('Failure: ' + (err || 'Error loading data'));
            this.data = null;

            if (this.masterElem !== null) {
                this.masterElem.visible = false;
            }
            this.hideProgressIndicator();
        };

        xhr.ontimeout = (err) => {
            //console.log("timeout");
            this.showErrorView('Timeout');
            this.data = null;

            if (this.masterElem !== null) {
                this.masterElem.visible = false;
            }
            this.hideProgressIndicator();
        };

        xhr.open('GET', fullUrl);
        xhr.send();
    }
};