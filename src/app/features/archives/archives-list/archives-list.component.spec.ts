import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesListComponent } from './archives-list.component';

describe('ArchivesListComponent', () => {
  let component: ArchivesListComponent;
  let fixture: ComponentFixture<ArchivesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchivesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArchivesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
