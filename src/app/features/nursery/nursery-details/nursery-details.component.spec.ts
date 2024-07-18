import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryDetailsComponent } from './nursery-details.component';

describe('NurseryDetailsComponent', () => {
  let component: NurseryDetailsComponent;
  let fixture: ComponentFixture<NurseryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseryDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
