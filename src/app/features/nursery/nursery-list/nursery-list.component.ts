import { Component, Input } from '@angular/core';
import { NurseryCardComponent } from '../nursery-card/nursery-card.component';
import { Nursery } from '../../../shared/interfaces/nursery.interface';

@Component({
    selector: 'mn-nursery-list',
    standalone: true,
    imports: [NurseryCardComponent],
    templateUrl: './nursery-list.component.html',
    styleUrl: './nursery-list.component.scss',
})
export class NurseryListComponent {
    @Input() nurseries: Nursery[];
}
