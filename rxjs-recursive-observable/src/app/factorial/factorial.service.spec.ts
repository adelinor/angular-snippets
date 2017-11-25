import { TestBed, inject } from '@angular/core/testing';
import { FactorialService } from './factorial.service';

describe('FactorialService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FactorialService]
    });
  });

  it('should be created', inject([FactorialService], (service: FactorialService) => {
    expect(service).toBeTruthy();
  }));

  it('computes factorial 0', inject([FactorialService], (service: FactorialService) => {
    service.factorial(0).subscribe(
      (result: number) => expect(result).toBe(1)
    );
  }));

  it('computes factorial 1', inject([FactorialService], (service: FactorialService) => {
    service.factorial(1).subscribe(
      (result: number) => expect(result).toBe(1)
    );
  }));

  it('computes factorial 2', inject([FactorialService], (service: FactorialService) => {
    let result = null;
    service.factorial(2).subscribe(
      (r: number) => result = r
    );
    expect(result).toBe(2);
  }));

  it('computes factorial 3', inject([FactorialService], (service: FactorialService) => {
    let result = null;
    service.factorial(3).subscribe(
      (r: number) => result = r
    );
    expect(result).toBe(6);
  }));

  it('computes factorial 10', inject([FactorialService], (service: FactorialService) => {
    let result = null;
    service.factorial(10).subscribe(
      (r: number) => result = r
    );
    expect(result).toBe(3628800);
  }));
});