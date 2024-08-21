import { Component, Input } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Parent } from '../../../shared/interfaces/parent.interface';
@Component({
    selector: 'mn-nursery-list',
    standalone: true,
    imports: [DataViewModule, TagModule, RatingModule, ButtonModule, CommonModule, CardModule],
    templateUrl: './parent-list.component.html',
    styleUrl: './parent-list.component.scss',
})
export class NurseryListComponent {
    @Input() parents: Parent[];
    layout: string = 'grid';
}
