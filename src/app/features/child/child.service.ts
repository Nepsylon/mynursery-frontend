import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../shared/services/base.service';
import { Child } from '../../shared/interfaces/child.interface';
import { PaginatedItems } from '../../shared/interfaces/paginated-items.interface';

@Injectable({ providedIn: 'root' })
export class ChildService extends BaseService<Child> {
    endPoint = 'children';

    constructor(http: HttpClient) {
        super(http);
    }

    getPaginatedChildrenByOwnerId(ownerId: string, pageNumber: number, itemQuantity: number): Observable<PaginatedItems> {
        return this.http.get<PaginatedItems>(
            `${this.baseUrl}/${this.endPoint}/childrenByOwnerIdPaginated/${ownerId}?page=${pageNumber}&itemQuantity=${itemQuantity}`
        );
    }
}
