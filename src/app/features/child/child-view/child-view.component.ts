import { Component, OnInit } from '@angular/core';
import { Child } from '../../../shared/interfaces/child.interface';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { ChildListComponent } from '../child-list/child-list.component';
import { PageEvent } from '../../../shared/interfaces/page-event.interface';
import { ChildService } from '../child.service';
import { PaginatedItems } from '../../../shared/interfaces/paginated-items.interface';

@Component({
    selector: 'mn-child-view',
    standalone: true,
    imports: [PaginatorModule, ButtonModule, RouterLink, ChildListComponent],
    templateUrl: './child-view.component.html',
    styleUrl: './child-view.component.scss',
})
export class ChildViewComponent implements OnInit {
    children: Child[] = [];
    filteredChildren: Child[] = [];
    totalCount: number = 0;
    first: number = 0;
    rows: number = 20;

    constructor(private childService: ChildService) {}

    ngOnInit(): void {
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
