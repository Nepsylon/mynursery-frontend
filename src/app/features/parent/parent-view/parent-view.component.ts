import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaginatedItems } from '../../../shared/interfaces/paginated-items.interface';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../shared/interfaces/page-event.interface';
import { ButtonModule } from 'primeng/button';
import { EmptyComponent } from '../../../shared/empty/empty.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AuthService } from '../../../core/auth/services/auth.service';
import { parentService } from '../parent.service';
import { Parent } from '../../../shared/interfaces/parent.interface';
import { ParentListComponent } from '../parent-list/parent-list.component';
import { ParentFormComponent } from '../parent-form/parent-form.component';
@Component({
    selector: 'mn-parent-view',
    standalone: true,
    imports: [PaginatorModule, RouterLink, ButtonModule, EmptyComponent, NgxSkeletonLoaderModule, ParentListComponent, ParentFormComponent],
    templateUrl: './parent-view.component.html',
    styleUrl: './parent-view.component.scss',
})
export class ParentViewComponent implements OnInit {
    @ViewChild('paginator') paginator: Paginator;
    @Output() onCreate = new EventEmitter<void>();
    parents: Parent[] = [];
    userRole: string | null;
    userId: string | null;
    totalCount: number = 0;
    first: number = 0;
    rows: number = 5;
    page: number = 0;
    skeletonNumbers = Array.from({ length: 5 }, (_, i) => i + 1);

    constructor(private parentService: parentService, private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        this.userId = this.authService.getUserId();
        this.generateParents(this.first, this.rows);
    }

    // Affiche une page sur base de son index
    generateParents(pageNumber: number, offset: number) {
        switch (this.userRole) {
            case 'admin':
                this.parentService.getPaginatedItems(pageNumber, offset).subscribe({
                    next: (data: PaginatedItems) => {
                        this.parents = data.items;
                        this.totalCount = data.totalCount;
                    },
                });

                break;
            case 'owner':
                this.userId = this.authService.getUserId();
                if (this.userId) {
                    this.parentService.getPaginatedParentsByOwnerId(this.userId, pageNumber, offset).subscribe({
                        next: (data: PaginatedItems) => {
                            this.parents = data.items;
                            this.totalCount = data.totalCount;
                        },
                    });
                }
                break;
            case 'user':
                this.userId = this.authService.getUserId();
                if (this.userId) {
                    this.parentService.getPaginatedParentsByEmployee(this.userId, pageNumber, offset).subscribe({
                        next: (data: PaginatedItems) => {
                            this.parents = data.items;
                            this.totalCount = data.totalCount;
                        },
                    });
                }
        }
    }

    refreshParents(numberToDelete?: number) {
        const parentsLength = this.parents.length;
        switch (parentsLength) {
            case 1:
                this.page -= 1;
                break;
            case numberToDelete:
                this.page -= 1;
                break;
        }
        this.generateParents(this.page, this.rows);
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
        this.generateParents(this.page, this.rows);
    }

    // Change page programmatically to a specific page
    changePageTo(page: number) {
        this.paginator.changePage(page); // 'page' is 0-based index, so for page 1, pass 0.
    }
}
