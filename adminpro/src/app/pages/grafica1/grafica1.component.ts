import { Component } from '@angular/core';
import {MultiDataSet} from "ng2-charts";



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component  {

 public labels:string[]= ['Pan', 'Tacos', 'Refresco'];

  public data1 = [
    [10, 20, 40],
  ];


}
