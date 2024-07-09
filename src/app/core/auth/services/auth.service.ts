import { Injectable } from '@angular/core';
import { BaseService } from '../../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<any> {
    constructor(http: HttpClient) {
        super(http);
    }

    endPoint = 'login';
}
