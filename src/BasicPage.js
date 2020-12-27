'use strict';
import { Button, Canvas, CheckBox, Composite, Page, device, Tab, TextView, Stack, ActivityIndicator, contentView } from 'tabris';
Promise = require("promise");
require("whatwg-fetch");

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
            width: "250",
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
        fetch(fullUrl)
            .then((response) => {
                // Check to see if the response status code is 200-299
                if (!response.ok) {
                    throw response.statusText;
                }
                return response.json();
            })
            .then((json) => {
                // Check that the response contains a success status
                if (json.status !== 'success') {
                    throw new Error(json.status || 'Response was not successful');
                }

                this.data = json.content;
                if (this.updateDataCallback !== null) {
                    this.updateDataCallback();
                }
            }).catch((err) => {
                // On error, show what went wrong and reload button
                console.log(err);
                this.showErrorView('Failure: ' + (err || 'Error loading data'));
                this.data = null;

                if (this.masterElem !== null) {
                    this.masterElem.visible = false;
                }
            }).then(() => {
                // This block always executes, regardless of success or failure
                // Dispose of the activity loader via direct reference
                this.hideProgressIndicator();
            });
    }
};