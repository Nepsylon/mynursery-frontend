import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Parent } from '../../../shared/interfaces/parent.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { parentService } from '../parent.service';
import { ToastrService } from 'ngx-toastr';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ParentFormComponent } from '../parent-form/parent-form.component';
@Component({
    selector: 'mn-parent-list',
    standalone: true,
    imports: [ButtonModule, CommonModule, CardModule, ToolbarModule, DialogModule, TableModule, ModalComponent, ParentFormComponent],
    templateUrl: './parent-list.component.html',
    styleUrl: './parent-list.component.scss',
})
export class ParentListComponent implements OnChanges {
    @Input() parents: Parent[];
    @Input() role: string | null;
    @Output() onDelete = new EventEmitter<void>();
    @Output() onMultipleDelete = new EventEmitter<number>();
    @Output() onCreate = new EventEmitter<void>();
    selectedParents: Parent[] | null;
    parentsToDelete: number[] = [];
    multipleDeleteDialog: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private parentService: parentService,
        private toastr: ToastrService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['parents'] && changes['parents'].currentValue) {
            this.selectedParents = [];
        }
    }

    refreshParents() {
        this.onCreate.emit();
    }

    openMultipleDeleteDialog() {
        this.multipleDeleteDialog = true;
    }

    hideMultipleDeleteDialog() {
        this.multipleDeleteDialog = false;
    }

    deleteSelectedProducts() {
        const deleteLength = this.parentsToDelete.length;
        this.parentService.softDeleteMultiple(this.parentsToDelete).subscribe({
            next: (res) => {
                this.toastr.success('Enfants supprimés avec succès !');
                if (deleteLength > 1) {
                    this.onMultipleDelete.emit(deleteLength);
                } else {
                    this.onDelete.emit();
                }
                this.parentsToDelete = [];
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
                this.parentsToDelete = this.parents.map((child) => child.id);
                break;
            case false:
                this.parentsToDelete = [];
                break;
        }
    }

    seeDetails(id: number) {
        this.router.navigate([id], { relativeTo: this.route });
    }

    // Gestion du clic sur le checkbox
    onCheckboxClick(event: Event, parent: Parent): void {
        event.stopPropagation(); // Empêche la redirection lorsque le checkbox est cliqué
        // Ajouter ou supprimer l'enfant dans le tableau de sélection
        const id = parent.id;
        if (this.parentsToDelete.includes(id)) {
            const index = this.parentsToDelete.indexOf(id);

            if (index !== -1) {
                this.parentsToDelete.splice(index, 1);
            }
        } else {
            this.parentsToDelete.push(id);
        }
    }

    deleteParent(id: number) {
        // appel au service pour supprimer l'élément
        this.parentService.delete(id.toString()).subscribe({
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
