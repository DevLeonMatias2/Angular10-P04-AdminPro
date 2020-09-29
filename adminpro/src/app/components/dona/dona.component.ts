import {Component, Input} from '@angular/core';
import {Color, Label, MultiDataSet} from "ng2-charts";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: []
})
export class DonaComponent {

  @Input() title: string = 'Sin titulo';

  @Input('labels') doughnutChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3', 'Label 4'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100, 200],
  ];
  public colors: Color[] = [
    {backgroundColor: ['#6857E6', '#009FEE', '#F02059', '#D42DF0']}
  ]
}
