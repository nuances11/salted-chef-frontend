import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefUploadComponent } from './chef-upload.component';

describe('ChefUploadComponent', () => {
  let component: ChefUploadComponent;
  let fixture: ComponentFixture<ChefUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
