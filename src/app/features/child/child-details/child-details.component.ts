import { Component, OnInit } from '@angular/core';
import { ChildService } from '../child.service';
import { ActivatedRoute } from '@angular/router';
import { Child } from '../../../shared/interfaces/child.interface';
import { ChildDetailsFormComponent } from '../child-details-form/child-details-form.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NotFoundComponent } from '../../../shared/not-found/not-found.component';

@Component({
    selector: 'mn-child-details',
    standalone: true,
    imports: [ChildDetailsFormComponent, NgxSkeletonLoaderModule, NotFoundComponent],
    templateUrl: './child-details.component.html',
    styleUrl: './child-details.component.scss',
})
export class ChildDetailsComponent implements OnInit {
    child: Child;
    childId: string;
    error: boolean;
    skeletonNumbers = Array.from({ length: 5 }, (_, i) => i + 1);

    constructor(private childService: ChildService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.childId = params['id'];
            this.getChildDetails();
        });
    }

    getChildDetails() {
        this.childService.get(this.childId).subscribe({
            next: (data: Child) => {
                this.child = data;
                this.error = false;
            },
            error: (err) => {
                this.error = true;
            },
        });
    }
}
