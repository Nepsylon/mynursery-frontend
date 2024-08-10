import { Component, OnInit } from '@angular/core';
import { Child } from '../../../shared/interfaces/child.interface';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ChildListComponent } from '../child-list/child-list.component';
import { PageEvent } from '../../../shared/interfaces/page-event.interface';
import { ChildService } from '../child.service';
import { PaginatedItems } from '../../../shared/interfaces/paginated-items.interface';
import { EmptyComponent } from '../../../shared/empty/empty.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'mn-child-view',
    standalone: true,
    imports: [PaginatorModule, ButtonModule, RouterLink, ChildListComponent, EmptyComponent, NgxSkeletonLoaderModule],
    templateUrl: './child-view.component.html',
    styleUrl: './child-view.component.scss',
})
export class ChildViewComponent implements OnInit {
    children: Child[] = [];
    filteredChildren: Child[] = [];
    userRole: string | null;
    totalCount: number = 0;
    first: number = 0;
    rows: number = 20;
    skeletonNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

    constructor(private childService: ChildService, private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        this.generatePage(this.first, this.rows);
    }

    // Affiche une page sur base de son index
    generatePage(pageNumber: number, offset: number) {
        this.childService.getPaginatedItems(pageNumber, offset).subscribe({
            next: (data: PaginatedItems) => {
                this.children = data.items;
                this.totalCount = data.totalCount;
            },
        });
    }

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.generatePage(event.page, this.rows);
    }
}
