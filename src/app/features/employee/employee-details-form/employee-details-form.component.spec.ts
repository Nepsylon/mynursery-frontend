import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsFormComponent } from './employee-details-form.component';

describe('EmployeesDetailsFormComponent', () => {
    let component: EmployeeDetailsFormComponent;
    let fixture: ComponentFixture<EmployeeDetailsFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EmployeeDetailsFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EmployeeDetailsFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
