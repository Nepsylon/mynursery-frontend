import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
    selector: 'mn-child-view',
    standalone: true,
    imports: [PaginatorModule, ButtonModule, RouterLink, ChildListComponent, EmptyComponent, NgxSkeletonLoaderModule],
    templateUrl: './child-view.component.html',
    styleUrl: './child-view.component.scss',
})
export class ChildViewComponent implements OnInit {
    @ViewChild('paginator') paginator: Paginator;
    children: Child[] = [];
    userRole: string | null;
    totalCount: number = 0;
    first: number = 0;
    rows: number = 5;
    page: number = 0;

    constructor(private childService: ChildService, private authService: AuthService) {}

    ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        this.generateChildren(this.first, this.rows);
    }

    // Affiche une page sur base de son index
    generateChildren(pageNumber: number, offset: number) {
        this.childService.getPaginatedItems(pageNumber, offset).subscribe({
            next: (data: PaginatedItems) => {
                this.children = data.items;
                this.totalCount = data.totalCount;
            },
        });
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
        console.log(this.page);

        this.generateChildren(this.page, this.rows);
        this.changePageTo(this.page);
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
