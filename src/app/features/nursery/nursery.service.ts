import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nursery } from '../../shared/interfaces/nursery.interface';
import { BaseService } from '../../shared/services/base.service';

@Injectable({ providedIn: 'root' })
export class NurseryService extends BaseService<Nursery> {
    endPoint = 'nurseries';

    constructor(http: HttpClient) {
        super(http);
    }

    updateLogo(id: string, dto: any): Observable<any> {
        return this.http.post<any>(`${this.baseUrl}/${this.endPoint}/${id}/logo`, dto);
    }

    deleteLogo(id: string): Observable<Nursery | any> {
        return this.http.delete<Nursery | any>(`${this.baseUrl}/${this.endPoint}/${id}/logo`);
    }
}
