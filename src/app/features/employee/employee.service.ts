import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Employee } from '../../shared/interfaces/employee.interface';

@Injectable({ providedIn: 'root' })
export class EmployeeService extends BaseService<Employee> {
    endPoint = 'users';

    constructor(http: HttpClient) {
        super(http);
    }
}
