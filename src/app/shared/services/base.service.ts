import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PaginatedItems } from '../interfaces/paginated-items.interface';

@Injectable()
export abstract class BaseService<T> {
    baseUrl: string = environment.URL;
    abstract endPoint: string;

    constructor(public http: HttpClient) {}

    create(dto: any): Observable<T> {
        return this.http.post<any>(`${this.baseUrl}/${this.endPoint}`, dto);
    }

    getAll(): Observable<T[]> {
        return this.http.get<T[]>(`${this.baseUrl}/${this.endPoint}`);
    }

    get(id: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${this.endPoint}/${id}`);
    }

    update(id: string, dto: any): Observable<unknown> {
        return this.http.put<unknown>(`${this.baseUrl}/${this.endPoint}/${id}`, dto);
    }

    delete(id: string): Observable<unknown> {
        return this.http.delete<unknown>(`${this.baseUrl}/${this.endPoint}/${id}`);
    }

    softDeleteMultiple(ids: number[]): Observable<unknown> {
        return this.http.post<unknown>(`${this.baseUrl}/${this.endPoint}/multiple`, ids);
    }

    getPaginatedItems(pageNumber: number, itemQuantity: number): Observable<PaginatedItems> {
        return this.http.get<PaginatedItems>(`${this.baseUrl}/${this.endPoint}/paginated?page=${pageNumber}&itemQuantity=${itemQuantity}`);
    }
}
