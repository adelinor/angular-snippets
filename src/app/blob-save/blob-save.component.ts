import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SafeUrl } from '@angular/platform-browser/src/security/dom_sanitization_service';
import { DownloadService } from './download.service';


@Component({
  selector: 'app-blob-save',
  templateUrl: './blob-save.component.html',
  styleUrls: ['./blob-save.component.css']
})
export class BlobSaveComponent implements OnDestroy {

  contentUrl: SafeUrl = null;
  private _downloading = false;
  private _urlAsString: string = null;

  /**
   * White list blob urls as explained in:
   * https://stackoverflow.com/questions/37432609/how-to-avoid-adding-prefix-unsafe-to-link-by-angular2
   */
  constructor(private sanitizer: DomSanitizer, private service: DownloadService) { }

  ngOnDestroy(): void {
    if (this._urlAsString) {
      console.log(`Dispose of ${this._urlAsString}`);
      window.URL.revokeObjectURL(this._urlAsString);
      this.contentUrl = null;
      this._urlAsString = null;
    }
  }

  get downloading(): boolean {
    return this._downloading;
  }

  getDoc(): void {
    this._downloading = true;
    this.service.getDoc().subscribe(
      xml => {
        this._downloading = false;
        this.onDownloadComplete(xml);
      });
  }

  private onDownloadComplete(xml: string): void {
    const cnt = new Blob([xml], {type: 'text/xml'});
    this._urlAsString = window.URL.createObjectURL(cnt);
    this.contentUrl =  this.sanitizer.bypassSecurityTrustUrl(this._urlAsString);
  }
}
