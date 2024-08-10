import { Component, OnInit } from '@angular/core';
import { NurseryService } from '../nursery.service';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../../shared/not-found/not-found.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NurseryDetailsFormComponent } from '../nursery-details-form/nursery-details-form.component';

@Component({
    selector: 'mn-nursery-details',
    standalone: true,
    imports: [CommonModule, NotFoundComponent, NgxSkeletonLoaderModule, NurseryDetailsFormComponent],
    providers: [NurseryService],
    templateUrl: './nursery-details.component.html',
    styleUrl: './nursery-details.component.scss',
})
export class NurseryDetailsComponent implements OnInit {
    nursery: Nursery;
    nurseryId: string;
    error: boolean;
    skeletonNumbers = Array.from({ length: 5 }, (_, i) => i + 1);

    constructor(private nurseryService: NurseryService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.nurseryId = params['id'];
            this.getNurseryDetails();
        });
    }

    getNurseryDetails(): void {
        this.nurseryService.get(this.nurseryId).subscribe({
            next: (data: Nursery) => {
                this.nursery = data;
                this.error = false;
            },
            error: (error) => {
                this.error = true;
            },
        });
    }
}
