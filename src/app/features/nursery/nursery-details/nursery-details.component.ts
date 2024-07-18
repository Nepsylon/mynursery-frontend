import { Component, OnInit } from '@angular/core';
import { NurseryService } from '../nursery.service';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'mn-nursery-details',
    standalone: true,
    imports: [],
    templateUrl: './nursery-details.component.html',
    styleUrl: './nursery-details.component.scss',
})
export class NurseryDetailsComponent implements OnInit {
    nursery: Nursery;
    constructor(private nurseryService: NurseryService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        const nurseryId = this.route.snapshot.params['id'];
        this.nurseryService.get(nurseryId).subscribe({
            next: (data: Nursery) => {
                this.nursery = data;
            },
            error: (error) => {
                console.error('Une erreur est survenue pendant la requête', error);
            },
        });
    }
}
