import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentDetailsFormComponent } from './parent-details-form.component';

describe('ParentDetailsFormComponent', () => {
  let component: ParentDetailsFormComponent;
  let fixture: ComponentFixture<ParentDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParentDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
