import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'mn-pagination-bar',
    standalone: true,
    imports: [],
    templateUrl: './pagination-bar.component.html',
    styleUrl: './pagination-bar.component.scss',
})
export class PaginationBarComponent {
    @Input() set totalPages(pageNumber: number) {
        this.pagesArray = new Array(pageNumber);
    }
    @Input() currentPage: number;
    @Output() pageChanged: EventEmitter<number> = new EventEmitter();
    pages: number[] = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    pagesArray: any[];

    onPageChange(event: Event) {}
}
