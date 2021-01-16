import { contentView, Stack, TabFolder } from 'tabris';
import { List, ListView, Cell } from 'tabris-decorators';
const UsagePage = require('./UsagePage').default;
const UserPage = require('./UserPage').default;
const UserPage2 = require('./UserPage2').default;
const VersionPage = require('./VersionPage').default;
const SettingsPage = require('./SettingsPage').default;
const VersionPage2 = require('./VersionPage2').default;

contentView.append(
  <Stack stretch spacing='12' padding='12'>
    <TabFolder paging stretch tabBarLocation='bottom' selectedTabTintColor='#F7464A' />
  </Stack>
);
let tabFolder = contentView.find(TabFolder).first();

let settingsPage = new SettingsPage(null, null, "Config", "Die Einstellungen");
settingsPage.appendTo(tabFolder);

let usagePage = new UsagePage('Line', "getstats.php?type=usage&tool=lennart", null, 'Usage', 'Die Anzahl der Zugriffe, der letzten 90 Tage')
usagePage.appendTo(tabFolder);

let userPage = new UserPage('Line', "getstats.php?type=user&tool=lennart", null, 'User', 'Die Anzahl der Nutzer, der letzten 90 Tage')
userPage.appendTo(tabFolder);

let userPage2 = new UserPage2("getstats.php?type=uniqueuser&tool=lennart", null, 'Unique', 'Die Anzahl der unterschiedlichen Nutzer, der letzten 90 Tage')
userPage2.appendTo(tabFolder);

let versionPage = new VersionPage("getstats.php?type=versions&tool=lennart", null, "Version", "Die genutzten Versionen, der letzten 90 Tage");
versionPage.appendTo(tabFolder);

let versionPage2 = new VersionPage2('Doughnut', "getstats.php?type=versions&tool=lennart", null, 'Version2', 'Die Zusammensetzung der Versionen, der letzten 90 Tage')
versionPage2.appendTo(tabFolder);