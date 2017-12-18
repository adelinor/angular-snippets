import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FactorialService } from './factorial.service';

@Component({
  selector: 'app-factorial',
  templateUrl: './factorial.component.html',
  styleUrls: ['./factorial.component.css']
})
export class FactorialComponent implements OnInit {

  n: number = null;
  reactive = false;

  factorialResult: number;
  isFinal = false;

  constructor(private factorialService: FactorialService,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    const paramMap = this.route.snapshot.paramMap;
    if (paramMap.has('n')) {
      this.n = +paramMap.get('n');
    }
    if (paramMap.has('reactive')) {
      this.reactive = (paramMap.get('reactive') === 'true');
    }
  }

  computeFactorial(): void {
    console.log('Reactive ' + this.reactive);
    if (this.reactive) {
      this.computeFactorialReactive();
    } else {
      this.computeFactorialBlocking();
    }
  }

  updateInput(event): void {
    console.log('Upd=' + event.target.value);
    this.n = event.target.value;
    this.factorialResult = null;
    this.isFinal = false;
  }

  toggleMethod(): void {
    this.reactive = ! this.reactive;
    this.factorialResult = null;
    this.isFinal = false;
  }

  private computeFactorialBlocking(): void {
    this.factorialService.factorial(this.n).subscribe(
      r => {
        this.factorialResult = r;
      },
      err => console.error(err),
      () => this.isFinal = true
    );
  }
  private computeFactorialReactive(): void {
    this.factorialService.reactiveFactorial(this.n).subscribe(
      r => {
        this.factorialResult = r;
      },
      err => console.error(err),
      () => this.isFinal = true
    );
  }

}
