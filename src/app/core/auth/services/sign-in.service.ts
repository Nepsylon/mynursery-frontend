import { Injectable } from '@angular/core';
import { createUserDto } from '../interfaces/create-user.dto';
import { BaseService } from '../../../shared/services/base.service';
import { User } from '../../../shared/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignInService extends BaseService<User> {
    override endPoint: string = 'users';
    constructor(http: HttpClient) {
        super(http);
    }

    register(userDto: createUserDto): Observable<User> {
        return this.create(userDto);
    }
}
