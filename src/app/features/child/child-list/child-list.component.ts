import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Child } from '../../../shared/interfaces/child.interface';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ChildService } from '../child.service';
import { ToastrService } from 'ngx-toastr';
import { ToolbarModule } from 'primeng/toolbar';
import { ChildFormComponent } from '../child-form/child-form.component';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'mn-child-list',
    standalone: true,
    imports: [TableModule, ButtonModule, ModalComponent, ToolbarModule, RouterLink, ChildFormComponent, DialogModule],
    templateUrl: './child-list.component.html',
    styleUrl: './child-list.component.scss',
})
export class ChildListComponent implements OnChanges {
    @Input() children: Child[];
    @Input() role: string | null;
    @Output() onDelete = new EventEmitter<void>();
    @Output() onMultipleDelete = new EventEmitter<number>();
    @Output() onCreate = new EventEmitter<void>();
    selectedChildren: Child[] | null;
    childrenToDelete: number[] = [];
    multipleDeleteDialog: boolean = false;

    constructor(private router: Router, private route: ActivatedRoute, private childService: ChildService, private toastr: ToastrService) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['children'] && changes['children'].currentValue) {
            this.selectedChildren = [];
        }
    }

    refreshChildren() {
        this.onCreate.emit();
    }

    openMultipleDeleteDialog() {
        this.multipleDeleteDialog = true;
    }

    hideMultipleDeleteDialog() {
        this.multipleDeleteDialog = false;
    }

    deleteSelectedProducts() {
        const deleteLength = this.childrenToDelete.length;
        this.childService.softDeleteMultiple(this.childrenToDelete).subscribe({
            next: (res) => {
                this.toastr.success('Enfants supprimés avec succès !');
                if (deleteLength > 1) {
                    this.onMultipleDelete.emit(deleteLength);
                } else {
                    this.onDelete.emit();
                }
                this.childrenToDelete = [];
                this.multipleDeleteDialog = false;
            },
            error: (err) => {
                this.toastr.error('Un problème est survenu pendant la suppression des éléments');
            },
        });
    }

    onHeaderCheckboxClick(checked: boolean) {
        switch (checked) {
            case true:
                this.childrenToDelete = this.children.map((child) => child.id);
                break;
            case false:
                this.childrenToDelete = [];
                break;
        }
    }

    seeDetails(id: number) {
        this.router.navigate([id], { relativeTo: this.route });
    }

    // Gestion du clic sur le checkbox
    onCheckboxClick(event: Event, child: Child): void {
        event.stopPropagation(); // Empêche la redirection lorsque le checkbox est cliqué
        // Ajouter ou supprimer l'enfant dans le tableau de sélection
        const id = child.id;
        if (this.childrenToDelete.includes(id)) {
            const index = this.childrenToDelete.indexOf(id);

            if (index !== -1) {
                this.childrenToDelete.splice(index, 1);
            }
        } else {
            this.childrenToDelete.push(id);
        }
    }

    deleteChild(id: number) {
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
}
