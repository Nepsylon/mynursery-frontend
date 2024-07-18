import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryCardComponent } from './nursery-card.component';

describe('NurseryCardComponent', () => {
  let component: NurseryCardComponent;
  let fixture: ComponentFixture<NurseryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseryCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseryCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
