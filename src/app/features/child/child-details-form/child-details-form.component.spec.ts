import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDetailsFormComponent } from './child-details-form.component';

describe('ChildDetailsFormComponent', () => {
  let component: ChildDetailsFormComponent;
  let fixture: ComponentFixture<ChildDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildDetailsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChildDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
