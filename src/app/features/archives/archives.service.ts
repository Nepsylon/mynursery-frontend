import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services/base.service';
import { User } from '../../shared/interfaces/user.interface';
import { Nursery } from '../../shared/interfaces/nursery.interface';
import { Child } from '../../shared/interfaces/child.interface';
import { Parent } from '../../shared/interfaces/parent.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ArchivesService extends BaseService<any> {
    override endPoint: string;

    constructor(http: HttpClient) {
        super(http);
    }

    getUsersArchives(): Observable<User[]> {
        this.endPoint = 'users';
        return this.http.get<User[]>(`${this.baseUrl}/${this.endPoint}/archives`);
    }

    getChildrenArchives(): Observable<Child[]> {
        this.endPoint = 'children';
        return this.http.get<Child[]>(`${this.baseUrl}/${this.endPoint}/archives`);
    }

    getParentsArchives(): Observable<Parent[]> {
        this.endPoint = 'parents';
        return this.http.get<Parent[]>(`${this.baseUrl}/${this.endPoint}/archives`);
    }
    getNurseriesArchives(): Observable<Nursery[]> {
        this.endPoint = 'nurseries';
        return this.http.get<Nursery[]>(`${this.baseUrl}/${this.endPoint}/archives`);
    }
}
