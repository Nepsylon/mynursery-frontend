import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryFormComponent } from './nursery-form.component';

describe('NurseryFormComponent', () => {
  let component: NurseryFormComponent;
  let fixture: ComponentFixture<NurseryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
