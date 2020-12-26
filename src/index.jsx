import { contentView, TabFolder } from 'tabris';
import { List, ListView, Cell } from 'tabris-decorators';
const UsagePage = require('./UsagePage').default;
const UserPage = require('./UserPage').default;
const VersionPage = require('./VersionPage').default;
const SettingsPage = require('./SettingsPage').default;

contentView.append(
  <TabFolder paging stretch selectionIndex={0} tabBarLocation='bottom' />
);
let tabFolder = contentView.find(TabFolder).first();

let settingsPage = new SettingsPage(null, null, "Einstellungen", "Die Einstellungen");
settingsPage.appendTo(tabFolder);

let usagePage = new UsagePage('Line', "getstats.php?type=usage&tool=lennart", null, 'Zugriffe', 'Die Anzahl der Zugriffe der letzten 90 Tage')
usagePage.appendTo(tabFolder);

let userPage = new UserPage('Line', "getstats.php?type=user&tool=lennart", null, 'Nutzer', 'Die Anzahl der Nutzer der letzten 90 Tage')
userPage.appendTo(tabFolder);

let versionPage = new VersionPage("getstats.php?type=versions&tool=lennart", null, "Versionen", "Die genutzten Versionen der letzten 90 Tage");
versionPage.appendTo(tabFolder);