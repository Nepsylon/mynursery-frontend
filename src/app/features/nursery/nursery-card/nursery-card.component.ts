import { Component, Input } from '@angular/core';
import { Nursery } from '../../../shared/interfaces/nursery.interface';
import { RouterLink } from '@angular/router';
import { CardModule } from 'primeng/card';
@Component({
    selector: 'mn-nursery-card',
    standalone: true,
    imports: [RouterLink, CardModule],
    templateUrl: './nursery-card.component.html',
    styleUrl: './nursery-card.component.scss',
})
export class NurseryCardComponent {
    @Input() nursery: Nursery;
}
