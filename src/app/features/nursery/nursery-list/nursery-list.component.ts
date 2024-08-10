import { Component, Input } from '@angular/core';
import { NurseryCardComponent } from '../nursery-card/nursery-card.component';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
@Component({
    selector: 'mn-nursery-list',
    standalone: true,
    imports: [NurseryCardComponent, DataViewModule, TagModule, RatingModule, ButtonModule, CommonModule, CardModule],
    templateUrl: './nursery-list.component.html',
    styleUrl: './nursery-list.component.scss',
})
export class NurseryListComponent {
    @Input() nurseries: Nursery[];
    layout: string = 'grid';
}
