import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAsideComponent } from './page-aside.component';

describe('PageAsideComponent', () => {
  let component: PageAsideComponent;
  let fixture: ComponentFixture<PageAsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAsideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
