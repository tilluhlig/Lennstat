import { Button, TextView, contentView, CollectionView, TabFolder, Tab, Stack, Composite, ActivityIndicator, ui, Page, NavigationView } from 'tabris';
import { List, ListView, Cell } from 'tabris-decorators';
const ChartPage = require('./ChartPage');
const chartData = require('./chart-data.json');

let versionItems = new List();
var versionPageErrorView = null;

contentView.append(
  <TabFolder paging stretch selectionIndex={0} tabBarLocation='bottom'>
    <Tab title='Nutzer'>
      <Stack spacing={12} padding={12} stretch>
        <TextView center text="Die Anzahl der Nutzer der letzten 90 Tage" />
        <Button center onSelect={updateUserData}>Aktualisieren</Button>
      </Stack>
    </Tab>
    <Tab title='Versionen'>
      <Stack spacing={12} padding={12} stretch>
        <TextView center text="Die genutzten Versionen der letzten 90 Tage" />
        <ListView stretch items={versionItems}>
          <Cell padding={8} height={52}>
            <TextView centerY bind-text='item' font='24px' />
          </Cell>
        </ListView>
        <Button center onSelect={updateVersionPage}>Aktualisieren</Button>
      </Stack>
    </Tab>
  </TabFolder>
);

function updateUsageData() {
  // TODO
}

function updateUserData() {
  // TODO
}

function clearList(list) {
  let anz = list.length;
  var i;
  for (i = 0; i < anz; i++) {
    list.pop();
  }
}

function createErrorView(text, tabPage) {
  return new TextView({
    centerY: true,
    centerX: true,
    text,
    markupEnabled: true
  }).appendTo(contentView.find(Tab)[tabPage]);
}

function updateVersionPage() {
  // Create loading indicator
  let activityIndicator = new ActivityIndicator({
    centerX: 0, centerY: 0
  }).appendTo(contentView.find(Tab)[1]);

  clearList(versionItems);
    
  // alte Fehlermeldungen entfernen
  if (versionPageErrorView !== null){
      versionPageErrorView.dispose();
  }

  // Run async remote request with fetch
  fetch('getstats.php?type=versions')
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

      var count = 0;
      var max = Math.floor(Math.random() * 20);
      for (let i = 0; i < max; i++) {
        count++;
        versionItems[count] = 'Version (' + count + ')';
      }

    }).catch((err) => {
      // On error, show what went wrong and reload button
      versionPageErrorView = createErrorView('Failure: ' + (err || 'Error loading data'), 1);
    }).then(() => {
      // This block always executes, regardless of success or failure
      // Dispose of the activity loader via direct reference
      activityIndicator.dispose();
    });
}

updateVersionPage();
let chart = {type: 'Line', data: chartData, title: 'Zugriffe', desc: 'Die Anzahl der Zugriffe der letzten 90 Tage'};
let usagePage = new ChartPage({chart})
usagePage.appendTo(contentView.find(TabFolder)[0]);
usagePage.onAppear.addListener(() => usagePage.drawChart());