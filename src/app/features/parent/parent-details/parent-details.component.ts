import { Component } from '@angular/core';
import { Parent } from '../../../shared/interfaces/parent.interface';
import { parentService } from '../parent.service';
import { ActivatedRoute } from '@angular/router';
import { ParentDetailsFormComponent } from '../parent-details-form/parent-details-form.component';
import { NotFoundComponent } from '../../../shared/not-found/not-found.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
    selector: 'mn-parent-details',
    standalone: true,
    imports: [ParentDetailsFormComponent, NotFoundComponent, NgxSkeletonLoaderModule],
    templateUrl: './parent-details.component.html',
    styleUrl: './parent-details.component.scss',
})
export class ParentDetailsComponent {
    parent: Parent;
    parentId: string;
    error: boolean;
    skeletonNumbers = Array.from({ length: 5 }, (_, i) => i + 1);

    constructor(private parentService: parentService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            this.parentId = params['id'];
            this.getParentDetails();
        });
    }

    getParentDetails() {
        this.parentService.get(this.parentId).subscribe({
            next: (data: Parent) => {
                this.parent = data;
                this.error = false;
            },
            error: (err) => {
                this.error = true;
            },
        });
    }
}
