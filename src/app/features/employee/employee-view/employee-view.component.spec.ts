import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewComponent } from './employee-view.component';

describe('EmployeesViewComponent', () => {
    let component: EmployeeViewComponent;
    let fixture: ComponentFixture<EmployeeViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmployeeViewComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployeeViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
