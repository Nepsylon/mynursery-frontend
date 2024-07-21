import { Injectable } from '@angular/core';
import { BaseService } from '../services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SearchBarService extends BaseService<any> {
    override endPoint: string = '';

    constructor(http: HttpClient) {
        super(http);
    }

    searchElements(endpoint: string, field: string, value: string): Observable<any[]> {
        this.endPoint = endpoint;
        return this.http.get<any[]>(`${this.baseUrl}/${this.endPoint}/search?field=${field}&value=${value}`);
    }
}
