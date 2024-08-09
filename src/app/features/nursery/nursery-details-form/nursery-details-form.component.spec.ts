import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryDetailsFormComponent } from './nursery-details-form.component';

describe('NurseryDetailsFormComponent', () => {
  let component: NurseryDetailsFormComponent;
  let fixture: ComponentFixture<NurseryDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseryDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseryDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
