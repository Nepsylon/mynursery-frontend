import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionComponent } from './condition-terms.component';

describe('ConditionComponent', () => {
    let component: ConditionComponent;
    let fixture: ComponentFixture<ConditionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConditionComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ConditionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
