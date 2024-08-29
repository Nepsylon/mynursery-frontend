import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Table, TableModule } from 'primeng/table';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ToolbarModule } from 'primeng/toolbar';
import { DialogModule } from 'primeng/dialog';

@Component({
    selector: 'mn-archives-list',
    standalone: true,
    imports: [TableModule, CommonModule, ButtonModule, FormsModule, InputTextModule, ModalComponent, ToolbarModule, DialogModule],
    templateUrl: './archives-list.component.html',
    styleUrl: './archives-list.component.scss',
})
export class ArchivesListComponent implements OnChanges {
    @Input() dataList: any[];
    @Output() onRestore = new EventEmitter<number>();
    @Output() onDelete = new EventEmitter<number>();
    @Output() onMultipleRestore = new EventEmitter<number[]>();
    @Output() onMultipleDelete = new EventEmitter<number[]>();
    selectedItems: any[] = [];
    multipleDeleteDialog: boolean = false;
    multipleRestoreDialog: boolean = false;

    columns: string[] = [];
    searchValue: string | undefined;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['dataList']) {
            this.generateTable();
        }
    }

    generateTable() {
        if (this.dataList.length > 0) {
            this.columns = Object.keys(this.dataList[0]);
        }
    }

    openMultipleDeleteDialog() {
        this.multipleDeleteDialog = true;
    }

    hideMultipleDeleteDialog() {
        this.multipleDeleteDialog = false;
    }

    openMultipleRestoreDialog() {
        this.multipleRestoreDialog = true;
    }

    hideMultipleRestoreDialog() {
        this.multipleRestoreDialog = false;
    }

    isDate(value: any): boolean {
        if (typeof value === 'string') {
            const date = new Date(value);
            return !isNaN(date.getTime());
        }
        return false;
    }

    clear(table: Table) {
        table.clear();
        this.searchValue = '';
    }

    deleteSelected(id: number) {
        this.onDelete.emit(id);
    }

    restoreSelected(id: number) {
        this.onRestore.emit(id);
    }

    deleteSelectedItems(checkedItems: any[]) {
        const ids = checkedItems.map((item) => item.id);
        this.onMultipleDelete.emit(ids);
    }

    restoreSelectedItems(checkedItems: any[]) {
        const ids = checkedItems.map((item) => item.id);
        this.onMultipleRestore.emit(ids);
    }
}
