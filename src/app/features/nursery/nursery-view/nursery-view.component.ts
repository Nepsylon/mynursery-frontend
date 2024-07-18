import { Component, OnInit } from '@angular/core';
import { NurseryListComponent } from '../nursery-list/nursery-list.component';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { NurseryService } from '../nursery.service';

@Component({
    selector: 'mn-nursery-view',
    standalone: true,
    imports: [NurseryListComponent],
    templateUrl: './nursery-view.component.html',
    styleUrl: './nursery-view.component.scss',
})
export class NurseryViewComponent implements OnInit {
    nurseries: Nursery[] = [];

    constructor(private nurseryService: NurseryService) {}

    ngOnInit(): void {
        this.nurseryService.getAll().subscribe((data) => {
            this.nurseries = data;
        });
    }
}
