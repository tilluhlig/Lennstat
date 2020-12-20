const { Button, Canvas, CheckBox, Composite, Page, device, Tab, TextView, Stack } = require('tabris');
const Chart = require('chart.js');

const DRAW_CHART_BUTTON_TEXT = 'Draw graph';
const ANIMATE_CHECKBOX_TEXT = 'Animate';

module.exports = class ChartPage extends Tab {

  constructor(properties) {
    super(Object.assign({ autoDispose: false }, properties));
    this._createUI();
    this._applyLayout();
    this.title = this.chart.title;
  }

  set chart(chart) {
    this._chart = chart;
  }

  get chart() {
    return this._chart;
  }

  _createUI() {
    this.append(
      new Stack({ spacing: 12, padding: 12, layoutData: "stretch" }).append(
        new TextView({ layoutData: "center", text: this.chart.desc }),
        new Composite()
          .append(new Canvas())
          .on({ resize: (event) => this._layoutCanvas(event) }),
        new Button({ layoutData: "center", id: 'drawChartButton', text: "Aktualisieren" })
          .on('select', () => this.drawChart())
      )
    );
  }

  drawChart() {
    let ctx = this._createCanvasContext();
    // workaround for scaling to native pixels by chart.js
    ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio);
    new Chart(ctx)[this.chart.type](this.chart.data, {
      animation: false,
      showScale: true,
      showTooltips: false,
      scaleShowLabels: true
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
      '#drawChartButton': { left: 16, top: 16 },
      'Composite': { left: 16, top: '#drawChartButton 16', right: 16, bottom: 16 },
      'Canvas': { left: 0, centerY: 0 }
    });
  }

  _layoutCanvas({ width, height }) {
    this.find(Canvas).set({ width, height: Math.min(width, height) });
  }

};
