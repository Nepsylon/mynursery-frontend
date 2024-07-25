import { Injectable } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { BaseService } from '../../shared/services/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserService extends BaseService<User> {
    endPoint = 'users';

    constructor(http: HttpClient) {
        super(http);
    }

    getPotentialOwners(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}/${this.endPoint}/potentialOwners`);
    }
}
