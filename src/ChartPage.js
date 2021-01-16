import { Button, Canvas, CheckBox, Composite, Page, device, Tab, TextView, Stack } from 'tabris';
const Chart = require('chart.js');
import BasicPage from './BasicPage';

export default class ChartPage extends BasicPage {

  constructor(type, url, data, title, desc) {
    super(url, data);
    this.title = title;
    this.desc = desc;
    this.type = type;
    this.items = null;
    this.chartElem = null;

    this._createUI();
    this._applyLayout();
    this.masterElem = this.find(Canvas).first();
    this.onAppear.addListener(() => this._update());
  }

  _createUI() {
    if (this.chartElem !== null) {
      this.chartElem.dispose();
    }

    this.chartElem =
      new Stack({ spacing: 12, padding: 12, layoutData: "stretch" }).append(
        new TextView({ text: this.desc, left: 0, right: 0 }),
        new Composite()
          .append(new Canvas())
          .on({ resize: (event) => this._layoutCanvas(event) }),
        new Button({ centerX: 1, id: 'drawChartButton', text: "Aktualisieren" })
          .on('select', () => this._update())
      );
    this.append(this.chartElem);
    
  }

  drawChart(max) {
    let ctx = this._createCanvasContext();
    // workaround for scaling to native pixels by chart.js
    let axisScale = Math.max(1, Math.round(max / 10));

    ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
    var chart = new Chart(ctx)[this.type](this.items, {
      animation: false,
      showScale: true,
      showTooltips: false,
      scaleShowLabels: true,
      scaleOverride: true,
      scaleSteps: Math.ceil(max / axisScale),
      scaleStepWidth: axisScale,
      scaleStartValue: 0
    });
  }

  _createCanvasContext() {
    let canvas = this.find(Canvas).first();
    let scaleFactor = device.scaleFactor;
    let bounds = canvas.bounds;
    let width = bounds.width * scaleFactor;
    let height = bounds.height * scaleFactor;
    return canvas.getContext('2d', width, height);
  }

  _applyLayout() {
    this.apply({
      'Composite': { left: 16, top: 16, right: 16, bottom: 16 },
      'Canvas': { left: 0, centerY: 0 }
    });
  }

  _layoutCanvas({ width, height }) {
    this.find(Canvas).set({ width, height: Math.min(width, height) });
  }

};
