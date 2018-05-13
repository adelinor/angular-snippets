import { Component, OnInit } from '@angular/core';
import { SampleService } from './sample.service';

@Component({
  selector: 'app-mocking',
  templateUrl: './mocking.component.html',
  styleUrls: ['./mocking.component.css']
})
export class MockingComponent implements OnInit {

  message: string = null;

  constructor(private sampleService: SampleService) { }

  ngOnInit() {
    this.message = this.sampleService.getMessage();
  }

}
