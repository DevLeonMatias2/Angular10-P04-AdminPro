import {Component, Input} from '@angular/core';
import {Color, Label, MultiDataSet} from "ng2-charts";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent  {
  @Input() title: string = 'Sin Titulo';
  @Input('labels') doughnutChartLabels: Label[] = ['label1', 'label2', 'label3'];
   @Input('data')doughnutChartData: MultiDataSet = [
    [350, 450, 100],
  ];
  public colors: Color[] = [
    {backgroundColor: ['#6857E6','#FF5800','#FFB414']}

  ];

}
