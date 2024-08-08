import { Component, Input } from '@angular/core';
import { Child } from '../../../shared/interfaces/child.interface';

@Component({
    selector: 'mn-child-list',
    standalone: true,
    imports: [],
    templateUrl: './child-list.component.html',
    styleUrl: './child-list.component.scss',
})
export class ChildListComponent {
    @Input() children: Child[];
}
