import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { Employee } from '../../../shared/interfaces/employee.interface';
import { EmployeeService } from '../employee.service';

@Component({
    selector: 'mn-employee-list',
    standalone: true,
    imports: [ButtonModule, CommonModule, CardModule, ToolbarModule, DialogModule, TableModule, ModalComponent, EmployeeFormComponent],
    templateUrl: './employee-list.component.html',
    styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnChanges {
    @Input() employees: Employee[];
    @Input() role: string | null;
    @Output() onDelete = new EventEmitter<void>();
    @Output() onMultipleDelete = new EventEmitter<number>();
    @Output() onCreate = new EventEmitter<void>();
    selectedEmployees: Employee[] | null;
    employeesToDelete: number[] = [];
    multipleDeleteDialog: boolean = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private employeeService: EmployeeService,
        private toastr: ToastrService
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['employees'] && changes['employees'].currentValue) {
            this.selectedEmployees = [];
        }
    }

    refreshEmployees() {
        this.onCreate.emit();
    }

    openMultipleDeleteDialog() {
        this.multipleDeleteDialog = true;
    }

    hideMultipleDeleteDialog() {
        this.multipleDeleteDialog = false;
    }

    deleteSelectedProducts() {
        const deleteLength = this.employeesToDelete.length;
        this.employeeService.softDeleteMultiple(this.employeesToDelete).subscribe({
            next: (res) => {
                this.toastr.success('Enfants supprimés avec succès !');
                if (deleteLength > 1) {
                    this.onMultipleDelete.emit(deleteLength);
                } else {
                    this.onDelete.emit();
                }
                this.employeesToDelete = [];
                this.multipleDeleteDialog = false;
            },
            error: (err) => {
                this.toastr.error('Un problème est survenu pendant la suppression des éléments');
            },
        });
    }

    onHeaderCheckboxClick(checked: boolean) {
        // switch (checked) {
        //     case true:
        //         this.employeesToDelete = this.employees.map((employee) => this.employee.id);
        //         break;
        //     case false:
        //         this.employeesToDelete = [];
        //         break;
        // }
    }

    seeDetails(id: number) {
        this.router.navigate([id], { relativeTo: this.route });
    }

    // Gestion du clic sur le checkbox
    onCheckboxClick(event: Event, employee: Employee): void {
        event.stopPropagation(); // Empêche la redirection lorsque le checkbox est cliqué
        // Ajouter ou supprimer l'employé dans le tableau de sélection
        const id = employee.id;
        // if (this.employeesToDelete.includes(id)) {
        //     const index = this.employeesToDelete.indexOf(id);

        //     if (index !== -1) {
        //         this.employeesToDelete.splice(index, 1);
        //     }
        // } else {
        //     this.employeesToDelete.push(id);
        // }
    }

    deleteEmployee(id: number) {
        // appel au service pour supprimer l'élément
        this.employeeService.delete(id.toString()).subscribe({
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
