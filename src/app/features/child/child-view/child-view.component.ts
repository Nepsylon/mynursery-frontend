import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Child } from '../../../shared/interfaces/child.interface';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { defaultUrlMatcher, RouterLink } from '@angular/router';
import { ChildListComponent } from '../child-list/child-list.component';
import { PageEvent } from '../../../shared/interfaces/page-event.interface';
import { ChildService } from '../child.service';
import { PaginatedItems } from '../../../shared/interfaces/paginated-items.interface';
import { EmptyComponent } from '../../../shared/empty/empty.component';
import { AuthService } from '../../../core/auth/services/auth.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Paginator } from 'primeng/paginator';
import { ChildFormComponent } from '../child-form/child-form.component';
import { TableModule } from 'primeng/table';

@Component({
    selector: 'mn-child-view',
    standalone: true,
    imports: [
        PaginatorModule,
        ButtonModule,
        RouterLink,
        ChildListComponent,
        EmptyComponent,
        NgxSkeletonLoaderModule,
        ChildFormComponent,
        TableModule,
    ],
    templateUrl: './child-view.component.html',
    styleUrl: './child-view.component.scss',
})
export class ChildViewComponent implements OnInit {
    @ViewChild('paginator') paginator: Paginator;
    @Output() onCreate = new EventEmitter<void>();
    children: Child[] = [];
    userRole: string | null;
    userId: string | null;
    totalCount: number = 0;
    first: number = 0;
    rows: number = 5;
    page: number = 0;
    skeletonNumbers = Array.from({ length: 5 }, (_, i) => i + 1);

    constructor(private childService: ChildService, private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        this.userId = this.authService.getUserId();
        this.generateChildren(this.first, this.rows);
    }

    // Affiche une page sur base de son index
    generateChildren(pageNumber: number, offset: number) {
        switch (this.userRole) {
            case 'admin':
                this.childService.getPaginatedItems(pageNumber, offset).subscribe({
                    next: (data: PaginatedItems) => {
                        this.children = data.items;
                        this.totalCount = data.totalCount;
                    },
                });
                break;
            case 'owner':
                this.userId = this.authService.getUserId();
                if (this.userId) {
                    this.childService.getPaginatedChildrenByOwnerId(this.userId, pageNumber, offset).subscribe({
                        next: (data: PaginatedItems) => {
                            this.children = data.items;
                            this.totalCount = data.totalCount;
                        },
                    });
                }
                break;

            case 'user':
                this.userId = this.authService.getUserId();
                if (this.userId) {
                    this.childService.getPaginatedChildrenByUserId(this.userId, pageNumber, offset).subscribe({
                        next: (data: PaginatedItems) => {
                            this.children = data.items;
                            this.totalCount = data.totalCount;
                        },
                    });
                }
                break;
        }
    }

    refreshChildren(numberToDelete?: number) {
        const childrenLength = this.children.length;
        switch (childrenLength) {
            case 1:
                this.page -= 1;
                break;
            case numberToDelete:
                this.page -= 1;
                break;
        }
        this.generateChildren(this.page, this.rows);
        this.changePageTo(this.page);
        this.ngOnInit();
    }

    onCreateRefresh() {
        this.onCreate.emit();
        this.ngOnInit();
    }

    onPageChange(event: PageEvent) {
        this.first = event.first;
        this.rows = event.rows;
        this.page = event.page;
        this.generateChildren(this.page, this.rows);
    }

    // Change page programmatically to a specific page
    changePageTo(page: number) {
        this.paginator.changePage(page); // 'page' is 0-based index, so for page 1, pass 0.
    }
}
