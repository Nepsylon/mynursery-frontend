import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginatedItems } from '../../../shared/interfaces/paginated-items.interface';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../shared/interfaces/page-event.interface';
import { ButtonModule } from 'primeng/button';
import { EmptyComponent } from '../../../shared/empty/empty.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AuthService } from '../../../core/auth/services/auth.service';
import { parentService } from '../parent.service';
@Component({
    selector: 'mn-parent-view',
    standalone: true,
    imports: [PaginatorModule, RouterLink, ButtonModule, EmptyComponent, NgxSkeletonLoaderModule],
    templateUrl: './parent-view.component.html',
    styleUrl: './parent-view.component.scss',
})
export class ParentViewComponent implements OnInit {
    userRole: string | null;
    constructor(private parentService: parentService, private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
    }
}
