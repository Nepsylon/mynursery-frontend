import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nursery } from '../../shared/interfaces/nursery.interface';
import { BaseService } from '../../shared/services/base.service';
import { PaginatedItems } from '../../shared/interfaces/paginated-items.interface';

@Injectable({ providedIn: 'root' })
export class NurseryService extends BaseService<Nursery> {
    endPoint = 'nurseries';

    constructor(http: HttpClient) {
        super(http);
    }

    getPaginatedOwnerNurseries(id: string, pageNumber: number, itemQuantity: number): Observable<PaginatedItems> {
        return this.http.get<PaginatedItems>(
            `${this.baseUrl}/${this.endPoint}/paginatedForOwner?owner=${id}&page=${pageNumber}&itemQuantity=${itemQuantity}`
        );
    }

    getNurseriesByOwner(id: string): Observable<Nursery[]> {
        return this.http.get<Nursery[]>(`${this.baseUrl}/${this.endPoint}/nurseriesByOwner/${id}`);
    }

    getWorkplacesByUser(id: string): Observable<Nursery[]> {
        return this.http.get<Nursery[]>(`${this.baseUrl}/${this.endPoint}/workplacesByUser/${id}`);
    }

    updateLogo(id: string, dto: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${this.endPoint}/${id}/logo`, dto);
    }

    deleteLogo(id: string): Observable<Nursery | any> {
        return this.http.delete<Nursery | any>(`${this.baseUrl}/${this.endPoint}/${id}/logo`);
    }
}
