import * as React from 'react';

import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { withStyles, WithStyles, createStyles  } from '@material-ui/core/styles';

import { LightBarStyle } from '../../types/FlowState';
import { DiodeToSpectrumHelper } from './helpers/DiodeToSpectrumHelper';

import { Chart } from 'chart.js';

const styles = (theme: Theme) => createStyles({
  root: {
  },
  chart: {
    width: '100%',
    minWidth: 300,
    maxWidth: 500,
    maxHeight: 200,
  },
  chartContainer: {
    width: '100%',
    height: '100%',
    maxWidth: 500,
    maxHeight: 200,
  },
});

export interface ISpectrumGraphProps extends WithStyles<typeof styles> {
  diodeSequence?: string[];
  lightBarStyle?: LightBarStyle;
}

export interface ISpectrumGraphState {
}

export const SpectrumGraph = withStyles(styles)(
  class extends React.Component<ISpectrumGraphProps, ISpectrumGraphState>{
    private spectrumData: number[] = [];
    private chart: Chart | undefined;

    constructor(props : ISpectrumGraphProps) {
      super(props);

      this.resetSpectrumMap();
    }

    public componentDidUpdate()
    {
      this.updateSpectrumMap();
      if (this.chart && this.chart.data.datasets)
      {
        this.chart.data.datasets.forEach((dataset) => {
          dataset.data = this.spectrumData;
        });
        this.chart.update();
      }
    }

    public componentDidMount()
    {
      var ctx = document.getElementById('spectrumChart') as HTMLCanvasElement;
      if (!ctx)
      {
        return;
      }
      
      var tdctx = ctx.getContext("2d");
      if (!tdctx)
      {
        return;
      }

      var gradientStroke = tdctx.createLinearGradient(0, 0, 400, 0);
      gradientStroke.addColorStop(0, "rgb(75, 58, 157)"); // purple
      gradientStroke.addColorStop(0.05, "rgb(81, 82, 166)"); // bp
      gradientStroke.addColorStop(0.28, "rgb(45, 140, 174)"); // blue
      gradientStroke.addColorStop(0.4, "rgb(83, 193, 54)"); // green
      gradientStroke.addColorStop(0.5, "rgb(237, 235, 88)"); // yellow
      gradientStroke.addColorStop(0.7, "rgb(240, 119, 64)"); // orange
      gradientStroke.addColorStop(1, "rgb(202, 42, 38)");// red

      var gradientFill = tdctx.createLinearGradient(0, 0, 400, 0);
      gradientFill.addColorStop(0, "rgb(75, 58, 157)");
      gradientFill.addColorStop(0.05, "rgb(81, 82, 166)"); // bp
      gradientFill.addColorStop(0.28, "rgb(45, 140, 174)");
      gradientFill.addColorStop(0.4, "rgb(83, 193, 54)");
      gradientFill.addColorStop(0.5, "rgb(237, 235, 88)");
      gradientFill.addColorStop(0.7, "rgb(240, 119, 64)");
      gradientFill.addColorStop(1, "rgb(202, 42, 38)");

      this.chart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: this.generateLabels(),
              datasets: [{
                  data: this.spectrumData,
                  borderColor:               gradientStroke,
                  pointBorderColor:          gradientStroke,
                  pointBackgroundColor:      gradientStroke,
                  pointHoverBackgroundColor: gradientStroke,
                  pointHoverBorderColor:     gradientStroke,
                  borderWidth: 1,
                  fill: true,
                  backgroundColor: gradientFill,
              }]
          },
          options: {
            title: {
              display: true,
              text: '** Spectrum',
            },
            elements: { point: { radius: 0 } },
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                gridLines: {
                  display:false
                }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  display: false
                },
                gridLines: {
                  display:false,
                  drawBorder: false,
                }
              }]
            }
          }
      });
    }

    public render() : JSX.Element {
      const { classes } = this.props;

      return (
        <div className={classes.chartContainer}>
          <canvas id="spectrumChart" className={classes.chart}></canvas>
        </div> 
      );
    }

    private generateLabels() {
      var labels = [];

      var counter = 0;
      for (var _i = 380; _i < 800; _i += 10) {
        if (counter === 0)
        {
          labels.push(String(_i));
        }
        else
        {
          labels.push("");
        }

        counter++;
        if (counter >= 2)
        {
          counter = 0;
        }
      }
      
      return labels;
    }

    private resetSpectrumMap() {
      this.spectrumData = [];
      for (var c = 0; c < 42; c++) {
        this.spectrumData.push(0);
      }
    }

    private updateSpectrumMap()
    {
      var diodeSeq = this.props.diodeSequence;
      
      if (diodeSeq)
      {
        this.resetSpectrumMap();

        diodeSeq.forEach(diode => {
          if (diode !== 'N/A')
          {
            var intensityArray : number[] = [];
            if (DiodeToSpectrumHelper.SpecialDiodeToSpectrum.has(diode))
            {
              var ia = DiodeToSpectrumHelper.SpecialDiodeToSpectrum.get(diode);
              if (ia)
              {
                intensityArray = ia;
              }
            }
            else
            {
              intensityArray = DiodeToSpectrumHelper.GetNarrowDiodeMap(diode);
            }

            this.spectrumData = this.spectrumData.map((a, i) => a + intensityArray[i]);
          }
        });
      }
    }
  }
)