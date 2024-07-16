import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardOwnerComponent } from './board-owner.component';

describe('BoardOwnerComponent', () => {
  let component: BoardOwnerComponent;
  let fixture: ComponentFixture<BoardOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardOwnerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
