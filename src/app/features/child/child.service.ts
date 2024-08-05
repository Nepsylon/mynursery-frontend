import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../shared/services/base.service';
import { Child } from '../../shared/interfaces/child.interface';

@Injectable({ providedIn: 'root' })
export class ChildService extends BaseService<Child> {
    endPoint = 'children';

    constructor(http: HttpClient) {
        super(http);
    }
}
