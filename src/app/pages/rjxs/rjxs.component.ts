import {Component, OnDestroy} from '@angular/core';
import {interval, Observable, Subscription} from "rxjs";
import {filter, map, retry, take} from "rxjs/operators";

@Component({
  selector: 'app-rjxs',
  templateUrl: './rjxs.component.html',
  styles: [
  ]
})
export class RjxsComponent implements  OnDestroy {

  public intervalSubs:Subscription;

  constructor() {


    // this.returnsObservable().pipe(
    //   retry(2)
    // ).subscribe(
    //   value => console.log('Subs:',value),
    //   error =>console.log('Error', error),
    //   ()=>console.log('obs finished '),
    // );
    this.intervalSubs=this.returnsInterval().subscribe(console.log)
  }

  returnsInterval(){
    return interval(100)
      .pipe(
        // take(10),
        map( value => value+1),
        filter( value =>(value % 2 === 0)),
      );


  }

  returnsObservable(): Observable<number>{
    let i=-1;
    return  new Observable<number>( observer =>{

      const interval= setInterval(()=>{
        i++;
        observer.next(i);

        if(i===4){
          clearInterval(interval);
          observer.complete();
        }

        if(i===2){
          observer.error(' i I get to the value of 2  ');
        }
      },1000)
    });

  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

}
