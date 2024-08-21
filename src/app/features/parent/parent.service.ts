import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { Parent } from '../../shared/interfaces/parent.interface';

@Injectable({ providedIn: 'root' })
export class parentService extends BaseService<Parent> {
    endPoint = 'parents';

    constructor(http: HttpClient) {
        super(http);
    }
}
