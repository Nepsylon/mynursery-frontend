import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitingEmailVerificationComponent } from './awaiting-email-verification.component';

describe('AwaitingEmailVerificationComponent', () => {
  let component: AwaitingEmailVerificationComponent;
  let fixture: ComponentFixture<AwaitingEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AwaitingEmailVerificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AwaitingEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
