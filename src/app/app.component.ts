import { Component } from '@angular/core';
import { FactorialService } from './rxjs-recursive-observable/factorial/factorial.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  n: number = null;
  reactive: boolean = false;

  private factorialResult: number;

  constructor(private factorialService: FactorialService) {}

  computeFactorial() {
    this.factorialResult = null;
    console.log('Reactive ' + this.reactive);
    const op = (this.reactive) ?
      this.factorialService.reactiveFactorial(this.n) :
      this.factorialService.factorial(this.n);
    op.subscribe(
      r => {
        this.factorialResult = r;
      }
    );
  }
}
