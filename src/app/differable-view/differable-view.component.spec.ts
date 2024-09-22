import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifferableViewComponent } from './differable-view.component';

describe('DifferableViewComponent', () => {
  let component: DifferableViewComponent;
  let fixture: ComponentFixture<DifferableViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DifferableViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifferableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
