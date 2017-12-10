import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobSaveComponent } from './blob-save.component';
import { DownloadService } from './download.service';

describe('BlobSaveComponent', () => {
  let component: BlobSaveComponent;
  let fixture: ComponentFixture<BlobSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlobSaveComponent ],
      providers: [ DownloadService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlobSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
