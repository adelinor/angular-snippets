import { Injectable } from '@angular/core';

@Injectable()
export class SampleService {

  constructor() { }

  getMessage(): string {
    return 'Message from the real service';
  }

}
