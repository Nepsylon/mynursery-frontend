import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Parent } from '../../shared/interfaces/parent.interface';
import { PaginatedItems } from '../../shared/interfaces/paginated-items.interface';
import { Observable } from 'rxjs';
import { Child } from '../../shared/interfaces/child.interface';

@Injectable({ providedIn: 'root' })
export class parentService extends BaseService<Parent> {
    endPoint = 'parents';

    constructor(http: HttpClient) {
        super(http);
    }

    getPaginatedParentsByOwnerId(ownerId: string, pageNumber: number, itemQuantity: number): Observable<PaginatedItems> {
        return this.http.get<PaginatedItems>(
            `${this.baseUrl}/${this.endPoint}/parentsByOwnerIdPaginated/${ownerId}?page=${pageNumber}&itemQuantity=${itemQuantity}`
        );
    }

    getChildrenByOwner(id: string): Observable<Child[]> {
        return this.http.get<Child[]>(`${this.baseUrl}/nurseries/childrenByOwner/${id}`);
    }
}
