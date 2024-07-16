import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryComponent } from './nursery.component';

describe('NurseryComponent', () => {
  let component: NurseryComponent;
  let fixture: ComponentFixture<NurseryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
