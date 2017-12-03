import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blob-save',
  templateUrl: './blob-save.component.html',
  styleUrls: ['./blob-save.component.css']
})
export class BlobSaveComponent implements OnInit {

  // This is the very long text to save
  text = `<theRoot element="hello">
    <child><header name="something">Some very long value</header></child>
  </theRoot>`;

  constructor() { }

  ngOnInit() {
  }

}
