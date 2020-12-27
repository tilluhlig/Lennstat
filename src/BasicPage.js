
import { Button, Canvas, CheckBox, Composite, Page, device, Tab, TextView, Stack, ActivityIndicator, contentView } from 'tabris';
import 'whatwg-fetch';

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
            width: 250,
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

    async updateData() {
        // Create loading indicator
        this.showProgressIndicator();
        this.hideErrorView();

        if (this.masterElem !== null) {
            this.masterElem.visible = true;
        }

        this.data = null;

        // Run async remote request with fetch
        let fullUrl = this.getLicenseServer() + "/" + this.url;
        const response = await window.fetch(fullUrl).catch(function(ex) {
             return ex;
          });
        //console.log(response);

        if (response == undefined || !response.ok) {
            //console.error(response.statusText);
            this.showErrorView("Fehler");
            if (this.masterElem !== null) {
                this.masterElem.visible = false;
            }
        } else {
            this.data = await response.json();
            this.data=this.data.content;
            if (this.updateDataCallback !== null) {
                this.updateDataCallback();
            }
        }
        this.hideProgressIndicator();
    }
};