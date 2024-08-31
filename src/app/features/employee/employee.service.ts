import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Employee } from '../../shared/interfaces/employee.interface';
import { Observable } from 'rxjs';
import { PaginatedItems } from '../../shared/interfaces/paginated-items.interface';

@Injectable({ providedIn: 'root' })
export class EmployeeService extends BaseService<Employee> {
    endPoint = 'users';

    constructor(http: HttpClient) {
        super(http);
    }

    getEmployeesPaginated(pageNumber: number, itemQuantity: number): Observable<PaginatedItems> {
        return this.http.get<PaginatedItems>(
            `${this.baseUrl}/${this.endPoint}/employees/paginated?page=${pageNumber}&itemQuantity=${itemQuantity}`
        );
    }

    getPaginatedEmployeesByOwnerId(ownerId: string, pageNumber: number, itemQuantity: number): Observable<PaginatedItems> {
        return this.http.get<PaginatedItems>(
            `${this.baseUrl}/${this.endPoint}/employeesByOwnerIdPaginated/${ownerId}?page=${pageNumber}&itemQuantity=${itemQuantity}`
        );
    }
}
