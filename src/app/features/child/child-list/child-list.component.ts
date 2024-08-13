import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Child } from '../../../shared/interfaces/child.interface';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ChildService } from '../child.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'mn-child-list',
    standalone: true,
    imports: [TableModule, ButtonModule, ModalComponent],
    templateUrl: './child-list.component.html',
    styleUrl: './child-list.component.scss',
})
export class ChildListComponent {
    @Input() children: Child[];
    @Output() onDelete = new EventEmitter<void>();

    constructor(private router: Router, private route: ActivatedRoute, private childService: ChildService, private toastr: ToastrService) {}

    delete(id: number) {
        // appel au service pour supprimer l'élément
        this.childService.delete(id.toString()).subscribe({
            next: (res: any) => {
                this.toastr.success('Enfant supprimé');
                this.onDelete.emit();
            },
            error: (err) => {
                this.toastr.error('La suppression a échouée');
            },
        });
    }

    seeDetails(event: any) {
        this.router.navigate([event.data.id], { relativeTo: this.route });
    }
}
