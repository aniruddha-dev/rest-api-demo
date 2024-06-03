import { Component } from '@angular/core';
import { ProductService } from './shared/services/product.service';

import {
  Observable,
  Subscription,
  forkJoin,
  map,
  mergeMap,
  of
} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Rest-API-Demo';

  subscription: Subscription | undefined;

  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  emitValues() {
    // Observable can emmit multiple values
    var observable = new Observable((res) => {
      res.next('Hello Piyush');
      res.next('Hello Vivek');
      res.next('Hello Rajesh');
    });
    observable.subscribe(console.log);
    //Output -->
    //Hello Piyush
    //Hello Vivek
    //Hello Rajesh

    // Promise will emit only single values that's why other two values are not emmited.
    var promise = new Promise((res) => {
      res('Hello Piyush');
      res('Hello Vivek');
      res('Hello Rajesh');
    });
    promise.then(console.log);
    //output
    //Hello Piyush
  }

  lazyLoad() {
    //Whenever subscribe observable then only it will emmit values beacuse it is lazy load.
    var observable = new Observable((res) => {
      res.next('Hello....');
    });
    observable.subscribe(console.log);
    //Output
    //Hello....

    //In console can see this output before calling promise it will initialized on creation and eagerly load.
    var promise = new Promise((res) => {
      console.log('Promise start executing...');
      res('Hello....');
    });
    //Call promise
    promise.then(console.log);
    //Output
    //Promise start executing...
    //Hello....
  }

  unsubscribe() {
    //observable
    const observable = new Observable((res) => {
      let count = 0;
      setInterval(() => {
        count = count + 1;
        res.next(count);
      }, 1000);
    });
    //subscribe the observable
    this.subscription = observable.subscribe((ele) => {
      console.log(ele);
    });
    //unsubscribe the observable
    setTimeout(() => {
      this.subscription?.unsubscribe();
    }, 12000);
  }

  mapOperator() {
    let observable = of(1, 2, 3);

    observable
      .pipe(map((data) => data * 2))
      .subscribe((data) => console.log(data));
  }

  // need to check
  filterOperator() {
    let observable = of(1, 2, 3, 4, 5);

    observable
      .pipe(map((data) => data % 2 != 0))
      .subscribe((data) => console.log(data));
  }

  mergeOperator() {
    let observable1 = of(1, 2, 3);
    let observable2 = of(4, 5, 6);

    observable1
      .pipe(
        mergeMap((value1) =>
          observable2.pipe(map((value2) => value1 + '' + value2))
        )
      )
      .subscribe((data) => console.log(data));
  }

  loadProducts() {
    const productsResponse1 = this.productService.getProducts();
    const productsResponse2 = this.productService.getProducts();

    forkJoin([productsResponse1, productsResponse2]).subscribe((result) => {
      console.log("Fork Join Result: " + result);
    });
  }
}
