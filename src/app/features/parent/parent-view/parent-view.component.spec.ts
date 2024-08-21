import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NurseryViewComponent } from './parent-view.component';

describe('NurseryViewComponent', () => {
    let component: NurseryViewComponent;
    let fixture: ComponentFixture<NurseryViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NurseryViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NurseryViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
