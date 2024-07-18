import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryListComponent } from './nursery-list.component';

describe('NurseryListComponent', () => {
  let component: NurseryListComponent;
  let fixture: ComponentFixture<NurseryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NurseryListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NurseryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
