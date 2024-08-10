import { Component, Input } from '@angular/core';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
    selector: 'mn-nursery-card',
    standalone: true,
    imports: [RouterLink, CardModule, ButtonModule, NgxSkeletonLoaderModule],
    templateUrl: './nursery-card.component.html',
    styleUrl: './nursery-card.component.scss',
})
export class NurseryCardComponent {
    @Input() nursery: Nursery;
}
