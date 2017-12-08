import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';


@Component({
  selector: 'app-blob-save',
  templateUrl: './blob-save.component.html',
  styleUrls: ['./blob-save.component.css']
})
export class BlobSaveComponent implements OnInit, OnDestroy {

  private xml = `<theRoot element="hello">
      <child><header name="something">Some very long value</header></child>
    </theRoot>`;
  contentUrl: SafeUrl = null;
  private urlAsString: string = null;

  /**
   * White list blob urls as explained in:
   * https://stackoverflow.com/questions/37432609/how-to-avoid-adding-prefix-unsafe-to-link-by-angular2
   */
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const cnt = new Blob([this.xml], {type: 'text/xml'});
    this.urlAsString = window.URL.createObjectURL(cnt);
    this.contentUrl =  this.sanitizer.bypassSecurityTrustUrl(this.urlAsString);
  }

  ngOnDestroy(): void {
    if (this.urlAsString) {
      console.log(`Dispose of ${this.urlAsString}`);
      window.URL.revokeObjectURL(this.urlAsString);
      this.contentUrl = null;
      this.urlAsString = null;
    }
  }
}
