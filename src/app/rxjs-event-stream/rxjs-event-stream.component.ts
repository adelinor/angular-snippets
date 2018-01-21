import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rxjs-event-stream',
  templateUrl: './rxjs-event-stream.component.html',
  styleUrls: ['./rxjs-event-stream.component.css']
})
export class RxjsEventStreamComponent implements OnInit {

  name: string = null;

  constructor() { }

  ngOnInit() {
  }

  toggleDate(choice: string): void {
    console.log(`Date=${choice}`);
  }

  toggleCategory(choice: string): void {
    console.log(`Category=${choice}`);
  }

  updateName(event): void {
    this.name = event.target.value;
  }

  search(): void {
    console.log(`Search with name=${this.name}`)
  }

}
